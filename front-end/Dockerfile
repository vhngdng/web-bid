FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN  npm i -g npm
# COPY webpack.config.js .
COPY ./ ./
RUN rm -rf node_modules/ && npm cache clean
RUN npm install
EXPOSE 3000
CMD [ "npm", "start"]