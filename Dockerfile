# Install Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json .
RUN npm ci

# Build App
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY . .
RUN npx next telemetry disable
RUN npm run build

# Run App
FROM node:20-alpine AS run
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
CMD [ "node", "server.js" ]