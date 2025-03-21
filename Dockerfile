FROM node:20.17.0-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

FROM base AS build

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/.env ./.env

RUN ls -la /app

CMD ["node", "dist/main"]