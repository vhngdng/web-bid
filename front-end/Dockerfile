FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run webpack
# COPY webpack.config.js .
COPY ./ ./
EXPOSE 3000
CMD [ "npm", "start"]