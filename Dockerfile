# ---------- Build Vue frontend ----------
FROM node:18-alpine AS build-frontend
WORKDIR /website
COPY website/package*.json ./
RUN npm ci
COPY website/ .
RUN npm run build

# ---------- Build Express backend ----------
FROM node:18-alpine AS backend
WORKDIR /server

# Install backend deps
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy source and tsconfig
COPY server ./server

# Compile TypeScript
RUN cd server && npm install typescript --save-dev && npx tsc

# Copy frontend build into public
COPY --from=build-frontend /website/dist ./server/dist/public

WORKDIR /server
EXPOSE 3000
CMD ["node", "dist/server.js"]
