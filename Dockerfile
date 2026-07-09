ARG NODE_VERSION=22.13.0
ARG PNPM_VERSION=11.7.0
ARG NPM_REGISTRY=https://mirrors.huaweicloud.com/repository/npm/

FROM node:${NODE_VERSION}-alpine AS deps

WORKDIR /app

ENV HUSKY=0

RUN npm install -g pnpm@${PNPM_VERSION} --force --registry=${NPM_REGISTRY}

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

FROM deps AS build

COPY . .

RUN pnpm build

FROM nginx:stable-alpine AS runner

RUN rm -f /etc/nginx/conf.d/default.conf

COPY nginx.prod.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]
