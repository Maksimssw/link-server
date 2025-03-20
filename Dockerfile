# Stage 1: Base stage
FROM node:20.17.0-alpine AS base

WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Stage 2: Build stage
FROM base AS build

# Копируем все файлы, включая schema.prisma и .env
COPY . .

# Генерируем Prisma клиент
RUN yarn prisma generate && ls -la /app/prisma/generated && echo "Prisma client generated successfully"

# Собираем проект
RUN yarn build

# Stage 3: Production stage
FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

# Копируем package.json и yarn.lock для установки production-зависимостей
COPY --from=build /app/package.json /app/yarn.lock ./

# Устанавливаем production-зависимости
RUN yarn install --frozen-lockfile

# Копируем собранные файлы и сгенерированный Prisma клиент
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/generated ./prisma/generated
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/.env ./.env

CMD ["node", "dist/main"]