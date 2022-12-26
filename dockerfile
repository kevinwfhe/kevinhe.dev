
# dockerfile
# build stage
FROM jecastro2/python-nodejs:3.9.12-common as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm install -g gatsby-cli@^4.2.0
RUN gatsby build


# host stage
FROM nginx:stable-alpine as host
COPY --from=build-stage /app/public /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]