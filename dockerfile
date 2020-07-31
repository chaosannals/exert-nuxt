FROM node

VOLUME [ "/app" ]
WORKDIR /app

ENTRYPOINT [ "npm", "run", "start" ]
