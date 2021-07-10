FROM node:14-alpine as builder

WORKDIR /app/user
ADD package*.json ./
RUN npm install
COPY . ./

CMD [ "npm", "run", "dev" ]