FROM node:hydrogen-alpine3.21

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 3000

RUN npm run build

CMD ["npm", "run", "start"]