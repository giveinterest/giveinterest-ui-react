FROM node:8.16.0-jessie
CMD mkdir /app
WORKDIR /app
COPY ./ /app
RUN npm install
RUN npm audit fix
CMD npm start