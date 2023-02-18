FROM node:18.14.1 as build 

WORKDIR /react-app

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:latest

COPY ./nginx/default.conf /etc/nginx/nginx.conf

COPY --from=build /react-app/build /usr/share/nginx/html