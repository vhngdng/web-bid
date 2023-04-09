FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run save
# COPY webpack.config.js .
COPY ./ ./
EXPOSE 3000
CMD [ "npm", "start"]