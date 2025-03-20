FROM node:20.17.0-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

FROM base AS build

COPY . .

RUN yarn prisma generate

RUN yarn build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/yarn.lock

RUN yarn install --production --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma/generated ./prisma/generated

CMD ["node", "dist/main"]