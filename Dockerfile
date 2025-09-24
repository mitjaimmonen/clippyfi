# ---------- Build website ----------
FROM node:22-alpine AS build-website
WORKDIR /website
COPY website/package*.json ./
RUN npm ci
COPY website/ .
RUN npm run build

# ---------- Build server ----------
FROM node:22-alpine AS build-server
WORKDIR /server
COPY server/package*.json ./
RUN npm ci
COPY server/ .
# Compile TypeScript to dist
RUN npm install typescript --save-dev \
    && npx tsc

# ---------- Production image ----------
FROM node:22-alpine
WORKDIR /server
COPY server/package*.json ./
RUN npm ci --only=production

# Copy compiled server
COPY --from=build-server /server/dist ./dist
# Copy built website into public folder (if needed)
COPY --from=build-website /website/dist ./dist/public

EXPOSE 3000
CMD ["node", "dist/server.js"]
