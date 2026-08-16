FROM debian:bookworm-slim AS builder

ARG HUGO_VERSION=0.147.7
ARG HUGO_BASEURL=/

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" \
      | tar -xz -C /usr/local/bin hugo

WORKDIR /src
COPY . .
RUN git submodule update --init --recursive || true
RUN hugo --gc --minify --baseURL "${HUGO_BASEURL}"

FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY --from=builder /src/public /usr/share/nginx/html
