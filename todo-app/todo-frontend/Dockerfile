FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

FROM test-stage AS build-stage

ENV REACT_APP_BACKEND_URL="http://todo_backend:3001"

RUN npm run build 

RUN npm install -g serve

CMD ["serve", "build", "-l", "5000"]