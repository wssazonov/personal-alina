FROM node:22.14.0-alpine

WORKDIR /app

COPY package.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY apps/backend/package.json apps/backend/package.json

RUN npm install --no-audit --progress=false

COPY . .

# Prisma needs a syntactically valid URL while generating the client.
ENV DATABASE_URL=postgresql://build:build@localhost:5432/build

RUN npm run prisma:generate \
    && npm --workspace @alina/backend run build

EXPOSE 3000

CMD ["sh", "-c", "npm run prisma:migrate:deploy && npm run prisma:seed && node apps/backend/dist/main.js"]
