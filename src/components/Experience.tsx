import React from 'react';
import { GraduationCap, Briefcase, Shield, Users, GitBranch } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Experience</h2>
        
        <div className="space-y-8">
          {/* 교육 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">숭실대학교</h3>
            </div>
            <div className="ml-9">
              <p className="text-gray-700">소프트웨어학부 21학번</p>
              <p className="text-gray-500">2021.03 - 현재</p>
            </div>
          </div>

          {/* 군대 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">공군 지능정보체계관리단</h3>
            </div>
            <div className="ml-9">
              <p className="text-gray-700">RPA개발병</p>
              <p className="text-gray-500">2023.03 - 2025.02 (21개월)</p>
            </div>
          </div>

          {/* 직장 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">뤼튼테크놀로지스</h3>
            </div>
            <div className="ml-9">
              <p className="text-gray-700">Data Engineer Intern</p>
              <p className="text-gray-500">2025.08 - 2026.02 (6개월)</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">(주)밸리언트데이터</h3>
            </div>
            <div className="ml-9">
              <p className="text-gray-700">연구원</p>
              <p className="text-gray-500">2022.07 - 2022.12 (6개월)</p>
            </div>
          </div>

          {/* 커뮤니티 활동 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">커뮤니티 활동</h3>
            </div>
            <div className="ml-9 space-y-4">
              <div className="flex items-center gap-2">
                <a 
                  href="https://sites.google.com/view/gdscsoongsil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                >
                  GDSC Soongsil 2nd, GDSC Soongsil 5th core member
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href="https://github.com/orgs/ssuperpower-developer/repositories" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                >
                  SSUPERPOWER
                </a>
                <span className="text-gray-600">Lead</span>
              </div>
            </div>
          </div>

          {/* 오픈소스 기여 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-teal-600" />
              <h3 className="text-xl font-semibold text-gray-900">오픈소스 기여</h3>
            </div>
            <div className="ml-9 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <a 
                    href="https://github.com/collabora/WhisperLive/pull/373" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 transition-colors font-medium"
                  >
                    WhisperLive
                  </a>
                  <span className="text-gray-600">- 실시간 음성 인식 서비스</span>
                </div>
                <p className="text-gray-700 text-sm">보안 WebSocket(WSS) 연결 지원 기능 추가 (#373 PR 머지됨)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 