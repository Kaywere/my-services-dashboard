# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add environment variable
ENV VITE_API_URL=http://192.168.1.51:5000

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]