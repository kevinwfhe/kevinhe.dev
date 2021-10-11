
# dockerfile
# build stage
FROM nikolaik/python-nodejs:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp"
RUN npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips"
RUN npm install
COPY . .
RUN npm global add gatsby-cli
RUN gatsby build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/public /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]