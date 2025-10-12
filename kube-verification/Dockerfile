# --- build stage ---
    FROM node:18-bullseye AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci
    
    COPY . .
    RUN npm run build
    RUN npx prisma generate
    
    # --- production stage ---
    FROM node:18-bullseye AS runner
    WORKDIR /app
    ENV NODE_ENV=production
    
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/prisma ./prisma
    
    EXPOSE 4001
    CMD ["node", "dist/server.js"]