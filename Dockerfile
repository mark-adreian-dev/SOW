# Stage 1: Build React frontend
FROM node:24-alpine3.22

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build  # output: /app/client/dist

CMD [ "npm", "run", "start" ]