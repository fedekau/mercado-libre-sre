FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install pm2 -g
RUN yarn install
COPY . .
EXPOSE 3000
