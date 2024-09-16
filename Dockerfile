FROM node:21.7.1-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine as production

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
