FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN  npm i -g npm
# COPY webpack.config.js .
COPY ./ ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]