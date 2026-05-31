FROM node:22.14.0-alpine AS build

WORKDIR /app

COPY package.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/backend/package.json apps/backend/package.json

RUN npm install --no-audit --progress=false

COPY . .

RUN npm run build:frontend

FROM nginx:1.27-alpine

COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/frontend/dist/personal-alina/browser /usr/share/nginx/html

EXPOSE 80
