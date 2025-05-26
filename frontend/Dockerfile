#LABEL authors="Metro"

# Build Stage
FROM node:18-alpine AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist /usr/share/nginx/html
#EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]