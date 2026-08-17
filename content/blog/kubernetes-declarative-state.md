---
title: "쿠버네티스: 선언적 상태 관리와 분산 시스템의 이해"
date: 2026-05-02T05:35:37+09:00
categories:
  - Infra
tags:
  - Kubernetes
  - k3s
  - GitOps
---

# 쿠버네티스 중간고사 보고서: 선언적 상태 관리와 분산 시스템의 이해 (with Official docs)

**작성자:** 숭실대학교 소프트웨어학부 김현수 (20213118)

## 1. 서론

쿠버네티스는 오케스트레이션이 아니라 선언적인 상태를 정의하고 그 상태로 향하기 위해 끊임없이 노력하는 시스템이다. 사용자는 "A를 먼저 하고, B를 하고, C를 해라"라는 절차를 지시하지 않는다. 그저 "이 상태여야 한다"고 선언하면 쿠버네티스가 알아서 현실을 맞춘다.

비유하자면 마치 성경에 "빛이 있으라(Let it be light)"고 하면 빛이 생기는 것과 비슷하다. 의도를 전달하면 되는 거다. 그 말을 기록한 게 etcd이고, 말이 yaml이며, 그 통로가 kube API다. 워크로드 리소스는 유저가 원하는 상태(Desired State)를 정의하는 것이고, 쿠버네티스는 그 Desired State로 나아가기 위해 여러 오케스트레이팅을 하는 존재다.

배포 방식의 역사를 보면 이 철학이 왜 필요한지 이해가 된다. 군대에서 RPA개발병으로 복무할 때는 물리 서버에 파이썬을 직접 배포했었다. VM을 거쳐 컨테이너로 진화하면서, 더 이상 개별 서버의 생존에 집착하지 않고 전체 시스템의 형상에 집중할 수 있게 되었다.

## 2. 클러스터 아키텍처

결국 CS는 추상화의 학문이다. 쿠버네티스의 CRI, CSI, CNI는 운영체제에서 동일하게 다루는 주제다. 한 대의 컴퓨터를 관리하는 게 OS라면, 여러 대의 컴퓨터를 한 대처럼 관리하는 게 쿠버네티스다.

노드 하나는 컴퓨터 하나다. AWS면 EC2 인스턴스 하나가 노드 하나가 된다. 홈랩이면 G4560 서버가 노드 하나다. 이 노드들의 집합이 클러스터이고, 클러스터는 컨트롤 플레인(Control Plane)과 워커 노드(Worker Node)로 구성된다.

OS 개념과 매핑하면 이해가 빠르다:

| 운영체제 | 쿠버네티스 |
|---|---|
| 프로세스 스케줄러 | kube-scheduler |
| 프로세스 | Pod |
| 파일시스템 | CSI (Volume) |
| 네트워크 스택 | CNI (Pod 네트워크) |
| init 시스템 | kubelet |
| syscall 인터페이스 | K8s API Server |

각 노드에 컨테이너 런타임을 깔아야 한다는 건 Docker Engine 같은 게 있어야 한다는 뜻이다. 정확히는 CRI(Container Runtime Interface) 호환 런타임이면 되고, k3s는 기본으로 containerd를 쓴다. Docker는 v1.24부터 직접 지원이 제거되었고, Docker 내부의 containerd를 직접 호출하는 구조로 바뀌었다.

Controller는 컨트롤 플레인에서 돌아간다. Deployment Controller, StatefulSet Controller, DaemonSet Controller 등이 kube-controller-manager 안에서 각자 담당하는 오브젝트의 상태를 감시하며 Desired State를 유지한다.

## 3. 핵심 오브젝트와 워크로드

### 파드(Pod)

쿠버네티스에는 여러 Object들이 있다. 여기서 가장 작은 Object이자 실행 단위는 Pod다. Pod는 Container의 껍데기로, Container의 실행과 상태 관리를 도와주는 역할을 한다.

Pod은 1:N으로 여러 Container를 가질 수 있지만, 왠만해서는 1:1이다. 같은 Pod 안의 컨테이너들은 Linux namespace를 공유하기 때문에 같은 PC에서 돌리는 것처럼 행동한다. 단순 네트워크 통신이 아니라 같은 localhost, 같은 IP, 같은 볼륨을 공유한다.

Pod의 상태는 Phase로 크게 나타내지만, 세부 상태로는 Condition이 있다. 이 세부 상태는 Probe를 통해 쿡쿡 찔러서 상황을 체크한다. 정확히는 Control Plane이 아니라 각 노드의 kubelet이 같은 노드의 Pod만 체크하는 분산 구조다.

Pod는 일회용 껍데기로 재시작이라는 프로세스는 없다. 문제가 생기면 고쳐서 쓰는 게 아니라 버리고 새로 만든다. Pod의 라이프사이클은 선형적이다. ArgoCD에서 "재시작"처럼 보이는 것도 실제로는 기존 Pod 삭제 후 새 Pod 생성이다. 이미지 바꿔서 적용하면 Pod 버전만 올라가고 rollout이 발생한다.

`CrashLoopBackOff` 상태도 Phase는 `Running`이다. 아무리 CrashLoopBackOff여도 아직 죽지는 않은 거니까. Pod라는 껍데기는 살아있고 내부 컨테이너가 계속 죽고 있는 것이다. Deployment에서 이런 Pod을 죽이고 새로 띄우지 않는 이유는, 같은 이미지로 새 Pod을 만들어봤자 같은 버그로 또 죽기 때문이다. 바꿔야 하는 건 Pod이 아니라 이미지(코드)다.

개인적으로는 `readinessGate` 기능이 인상적이었다. docker-compose에서는 컨테이너 간 준비 상태를 판단하는 기준이 모호해서 개고생했는데, 쿠버네티스에서는 커스텀 조건까지 추가해서 서비스 투입 시점을 정교하게 제어할 수 있다.

### 워크로드 리소스

Deployment, StatefulSet, DaemonSet, Job, CronJob 등을 통틀어 워크로드 리소스라고 한다. Pod을 직접 만들 필요가 없다는 건 이 워크로드 리소스가 Pod 템플릿으로 Pod을 찍어내고 관리해주기 때문이다.

- **Deployment:** 가축(Cattle)과 같다. 이름이 중요하지 않고 대체 가능한 stateless 앱용이다.
- **StatefulSet:** 반려동물(Pet)과 같다. 각자 고유한 이름과 자기만의 소지품(전용 PVC)이 있다. 고정 이름, 고정 볼륨, 고정 순서가 보장된다.
- **DaemonSet:** 모든 노드에 하나씩 실행되어야 하는 것. 로그 수집기나 모니터링 에이전트 용도.
- **Job/CronJob:** 한 번 실행하고 끝나거나 주기적으로 실행되는 작업.

처음에는 DB가 각각 PVC를 쓰는 상황이 잘 그려지지 않았는데, 뤼튼 인턴 시절 다뤘던 Kafka, Elasticsearch, MongoDB 같은 분산 DB 클러스터를 떠올려보니 이해가 갔다. Deployment에서도 볼륨을 마운트해서 쓸 수는 있겠지만, Pod이 다른 노드로 옮겨졌을 때 같은 볼륨에 다시 붙는 것이 보장되지 않는다. StatefulSet은 이걸 보장해준다.

## 4. 서비스와 네트워킹

### 서비스(Service)

서비스는 Pod들의 집합이 되어 서비스 디스커버리 역할을 한다. 이름으로 특정 서비스 하위의 Pod가 변경되더라도, IP를 코드 단에서 수정하지 않도록 해준다. 서비스는 꼭 같은 컨테이너 이미지들의 집합이 아닐 수도 있고, selector로 라벨링한 여러 종류의 Pod들을 하나의 서비스로 묶는 것도 가능하다.

중요한 건 Service는 Node에 속하지 않는 클러스터 레벨 개념이라는 점이다. 여러 노드에 걸친 Pod들을 논리적으로 하나로 묶을 수 있다. Service가 L4까지 책임진다면, Ingress는 L7까지 책임진다.

Service 타입은 중첩 구조다:
- **ClusterIP:** 클러스터 내부에서만 접근. 기본값.
- **NodePort:** 모든 노드에 같은 포트를 열어서 외부 진입점을 만든다. ClusterIP를 포함한다. 홈랩에서 Airflow UI를 `100.89.9.31:32395`로 접근하는 게 이것이다.
- **LoadBalancer:** 클라우드 LB를 자동 생성하고 NodePort + ClusterIP를 포함한다. NodePort만으로 프로덕션이 안 되는 이유는 노드 장애 시 접근 불가, 30000~32767 포트 제한, 고정 IP 없음 때문이다.

### kube-proxy

kube-proxy의 구현부(implements)라는 말에서 알 수 있듯, Service는 추상 개념이고 kube-proxy가 실제 구현체다. kube-proxy는 L4 로드밸런서에 가깝다. 실제로 트래픽을 직접 중계하지 않고 iptables DNAT 규칙만 세팅해두면 커널이 알아서 패킷을 변환한다. kube-proxy 프로세스가 죽어도 이미 설정된 규칙은 동작한다.

Envoy/Istio는 kube-proxy 위에 레이어를 하나 더 얹는 것이다. L7에서 재시도, 서킷브레이커, mTLS 암호화, 트래픽 분할 같은 고급 기능을 제공한다. 네트워크 방화벽(firewalld) 같은 규칙은 K8s에서 NetworkPolicy로 한다. IP가 아니라 라벨 기반으로 규칙을 만드는 게 차이점이다.

### 인그레스(Ingress)

처음에는 Ingress가 기존 개념과 연결이 잘 안 됐다. 결국 이해한 바로는, Ingress는 다른 서비스 오브젝트를 참조하는 독립적인 오브젝트다. Ingress Object는 선언, Ingress Controller는 수행, Ingress-managed LB는 외부 로드밸런서다.

Ingress 없이 Service에 `type: LoadBalancer`를 걸면 LB와 Service가 1:1로 붙는다. Ingress를 쓰면 LB 1:1 Ingress, 1:N Service로 바뀌면서 LB 비용을 절약한다. LB가 필요한 지점은 Ingress Controller 딱 하나면 충분하고, 나머지 앱 Service들은 전부 ClusterIP로 처리하면 된다.

결국 Ingress Controller도 Pod이다. K8s에서 뭔가 실행된다는 건 전부 Pod이다. API Server도, CoreDNS도, Ingress Controller도 Pod이고, 나머지 오브젝트들(Service, Ingress, Deployment)은 Pod을 관리하거나 Pod에 접근하는 방법을 정의하는 선언일 뿐이다.

Ingress는 현재 frozen 상태이고 Gateway API로 발전 중이다. Ingress는 어노테이션이 구현체마다 난립하고 HTTP만 지원하며 역할 분리가 안 됐다. Ingress가 하나의 악보라면 연주자(nginx, traefik, ALB)마다 해석이 달랐던 것이다. Gateway API는 악보 표기법을 표준화하고, 인프라팀(Gateway)과 개발팀(HTTPRoute)의 역할을 분리했다.

### 네트워크 수업과의 연결

네트워크 수업에서 배운 개념들이 쿠버네티스에서 구체화된다:
- **DNS(L7):** CoreDNS가 서비스 이름을 IP로 변환. 서비스 디스커버리의 핵심.
- **ARP(L2):** MetalLB L2 모드에서 Gratuitous ARP로 가상 IP를 광고.
- **BGP(L3):** MetalLB L3 모드에서 각 노드가 라우터와 BGP 피어링으로 경로 광고.
- **VXLAN:** 노드 간 Pod 통신에서 "편지 안에 편지를 넣는" 방식의 L2 over L3 터널링. CNI(Flannel)가 처리한다.

## 5. 스토리지

쿠버네티스가 스토리지 영역에서 추가한 것은 '선언적인 관리'이지 '데이터의 안전성'이 아니다. 결국 디스크라는 것은 머신에 종속적이니까 어쩔 수 없다. 노드 장애와 디스크 장애는 다른 문제다. 전자는 네트워크 스토리지로 해결되지만, 후자는 백업/복제로만 해결된다.

Docker Volume은 동일한 개념인데, K8s가 access 범위를 더 늘린 것이다. 파일시스템은 로컬이 꼭 아니어도 되고, NFS나 EBS 같은 것으로 파일시스템 API만 충족하면 다 Volume이 되는 구조다. 진짜 리눅스 마운트 기능 때문에 이렇게 손쉽게 파일시스템을 제공할 수 있는 것이다.

- **emptyDir:** Pod과 함께 태어나고 죽는 임시 볼륨. 임시 볼륨이더라도 Pod 라이프사이클이 끝나지 않았으면 살아있다. 컨테이너 크래시에도 데이터가 유지된다.
- **hostPath:** Docker의 bind mount와 같다. 노드 종속적이라 프로덕션에서는 지양한다.
- **PV/PVC:** PV는 인프라팀이 미리 준비해둔 호텔 방, PVC는 개발자가 "방 하나 주세요"라고 보내는 예약 요청서다. 인프라팀이 StorageClass를 한 번 정의해두면, 개발팀은 Helm chart에서 PVC만 기재하면 알아서 된다.

Docker도 NFS 쓰면 노드 이동이 가능하지만, Docker는 "이 NFS 경로를 마운트해(How)"를 직접 지정하는 반면, K8s는 "10GB 스토리지 주세요(What)"만 선언하면 된다.

## 6. 설정 관리

ConfigMap은 환경 변수나 설정 파일을, Secret은 암호 같은 민감 정보를 코드에서 분리한다. 운영 환경에서 매번 환경변수 바꿀 때마다 인프라팀 요청하면 한세월이니까, 실무에서는 개발팀이 자기 네임스페이스에서 직접 관리한다.

Git에 ConfigMap을 커밋하고 PR 리뷰를 거쳐 머지하면 ArgoCD나 Flux 같은 도구가 자동으로 클러스터에 반영한다. 인프라팀을 안 거쳐도 된다. 뤼튼에서는 Infisical 같은 시크릿 매니저를 써서 바꾸면 알아서 ArgoCD 타서 Pod이 바뀌는 식이었다. 홈랩에서는 SOPS로 암호화한 Secret을 Git에 커밋하고 Flux CD가 동기화하는 방식을 쓰고 있다.

## 7. 결론

쿠버네티스를 이틀간 공식문서로 공부하면서 느낀 건, 이게 단순히 컨테이너를 띄우는 도구가 아니라 여러 대의 컴퓨터를 한 대처럼 추상화하는 분산 운영체제라는 점이다.

군대에서 물리 서버에 파이썬을 직접 배포하던 때를 생각하면, 그때는 서버 한 대가 죽으면 새벽에 일어나서 수동으로 복구해야 했다. 쿠버네티스는 "nginx 3개 실행"이라고 선언해두면 하나가 죽어도 알아서 새로 만든다. 이 차이가 결국 명령형과 선언형의 차이다.

네트워크 수업에서 배운 ARP, BGP, DNS가 쿠버네티스 안에서 실제로 동작하는 것을 보니, 학교에서 배우는 이론이 실무와 얼마나 직접적으로 연결되는지 체감할 수 있었다. MetalLB가 ARP로 가상 IP를 광고하고, CoreDNS가 서비스 이름을 해석하고, CNI가 VXLAN으로 노드 간 통신을 구성하는 것 모두 수업에서 다루는 프로토콜들이다.

CRI, CSI, CNI라는 세 가지 인터페이스 설계가 특히 인상적이었다. 쿠버네티스 코어는 "무엇을 해야 하는지"만 정의하고, "어떻게 하는지"는 플러그인에 위임한다. 이건 OS가 디바이스 드라이버를 다루는 방식과 같다. 결국 잘 설계된 인터페이스 하나가 수십 가지 구현체를 가능하게 만든다는 것을 다시 확인했다.

홈랩에서 k3s와 Flux CD를 직접 구축하고 운영해본 경험이 이 공부를 하는 데 큰 도움이 되었다. etcd에 저장되고, Controller가 감시하고, kubelet이 실행하는 이 흐름을 이론으로만 읽었으면 와닿지 않았을 것이다. 직접 `kubectl get pods`를 치고 `CrashLoopBackOff`를 보고 원인을 찾아본 경험이 있어야 "Pod은 일회용이고, 문제가 생기면 버리고 새로 만든다"는 말이 체감된다.
