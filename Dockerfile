FROM node:12

WORKDIR /usr/src/todoapp

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "start"]