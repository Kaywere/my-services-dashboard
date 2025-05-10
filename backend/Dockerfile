FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .  # This will copy services.json along with other files

EXPOSE 5000

CMD ["node", "server.js"]