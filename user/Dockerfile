FROM node:14-alpine as builder

ARG DEPLOY_TARGET=staging
WORKDIR /app
ADD package*.json ./
RUN npm install
COPY . ./
ENV DEPLOY_TARGET=$DEPLOY_TARGET
RUN npm run build

FROM node:14-alpine 

WORKDIR /app
ENV NODE_ENV=production
ADD package*.json ./
RUN npm install

ADD nuxt.config.js ./
ADD envs envs
COPY --from=builder ./app/.nuxt ./.nuxt/
COPY --from=builder ./app/static ./static/
COPY --from=builder ./app/services ./services/

EXPOSE 8080
ENV HOST=0.0.0.0
ENV PORT=8080

CMD [ "npm", "run", "start" ]