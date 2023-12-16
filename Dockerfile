FROM node:18-buster-slim as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21.5-alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3003

CMD ["nginx", "-g", "daemon off;"]