FROM node:16-alpine

# Create app directory
WORKDIR /app/server_nestjs
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
# Development
CMD ["npm", "run", "start:dev"]
