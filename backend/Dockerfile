# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create data directory and copy services.json
RUN mkdir -p /app/data && \
    cp services.json /app/data/ || echo '{}' > /app/data/services.json

EXPOSE 5000

CMD ["node", "server.js"]