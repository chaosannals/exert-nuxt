FROM node:16.3.0 AS builder

WORKDIR /app
COPY . /app

RUN cp /usr/share/zoneinfo/PRC /etc/localtime && \
  npm config set registry https://registry.npm.taobao.org  && \
  npm install -g npm@7.19.0 && \
  npm config set python python2.7 && \
  npm i && \
  npm run build

FROM node:16.3.0-alpine

WORKDIR /app
EXPOSE 3000

COPY --from=builder /app /app

RUN apk update && \
  apk add tzdata && \
  cp /usr/share/zoneinfo/PRC /etc/localtime

ENTRYPOINT [ "npm", "run", "start" ]
