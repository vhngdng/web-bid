FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 7900
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]