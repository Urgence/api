FROM node:12-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

EXPOSE 8080
CMD [ "node", "." ]
