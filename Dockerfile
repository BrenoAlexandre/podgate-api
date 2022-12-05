FROM node:alpine as build

WORKDIR /app

COPY . .

RUN npm i && \
    npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist .

COPY .env .
COPY ./tsconfig-paths.js .
COPY ./tsconfig.json .

RUN npm i

EXPOSE 3001

CMD ["npm", "start"]