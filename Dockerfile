FROM public.ecr.aws/docker/library/node:19
# FROM node:19-alpine

WORKDIR /usr/src/big3_api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "src/index.js"]
