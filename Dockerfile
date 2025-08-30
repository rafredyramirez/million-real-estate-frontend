# ========== Build ==========
FROM node:22-alpine AS build
WORKDIR /app

# Instala deps
COPY package*.json ./
RUN npm ci

# Copia fuentes
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build de producción
RUN npm run build

# ========== Runtime ==========
FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html

# Copia estáticos
COPY --from=build /app/dist ./

# Nginx config (con proxy a backend si usas VITE_API_URL=/api)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
