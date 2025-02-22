# Build stage
FROM node:18.17.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18.17.0-alpine
WORKDIR /app
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Copying public folder separately to ensure it exists
COPY --from=builder /app/app ./app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]
