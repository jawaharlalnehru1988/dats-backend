# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install           # Install all dependencies (including devDeps)
COPY . .                  
RUN npm run build         # Creates /dist folder
RUN npm prune --production # Remove devDependencies

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Copy only production-ready files
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Security: Run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/main.js"]
