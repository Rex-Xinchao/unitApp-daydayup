# web发布
FROM nginx:1.17.9-alpine

COPY dist/build/h5 /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8089

CMD ["nginx", "-g", "daemon off;"]