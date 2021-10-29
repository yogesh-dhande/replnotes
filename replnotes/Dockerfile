FROM node:14-alpine as builder

WORKDIR /app/replnotes
ADD package*.json ./
RUN npm install
COPY . ./

CMD [ "npm", "run", "dev" ]