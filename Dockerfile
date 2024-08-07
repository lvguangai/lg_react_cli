ARG NODE_ENV=test

# 基于alpine容器封装的nginx1.19.2版本的镜像部署
FROM node:18.20.2 as build
MAINTAINER zmj "zhoumingjie@sspedu.com"

ARG NODE_ENV
# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json package-lock.json ./
RUN npm install --registry=https://mirrors.huaweicloud.com/repository/npm/
RUN echo " ------------------Web打包 --------------------"
# add app
COPY . ./
RUN npm run build:${NODE_ENV}

FROM nginx:1.19.2
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.prod.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]