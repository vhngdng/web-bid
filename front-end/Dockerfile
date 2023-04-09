FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# COPY webpack.config.js .
COPY ./ ./
EXPOSE 3000
CMD [ "npm", "start"]