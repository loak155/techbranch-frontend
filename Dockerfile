FROM node:21.7.1-alpine

WORKDIR /usr/scr/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
