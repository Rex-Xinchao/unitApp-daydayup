# node 发布
FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN node -v

RUN npm -v

RUN npm install pm2

RUN whereis pm2

RUN npm install

EXPOSE 3000

CMD [ "pm2-runtime", "./bin/www" ]