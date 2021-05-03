FROM node:14.16-slim

WORKDIR /app

COPY . .

RUN yarn global add pm2 && pm2 update && yarn install && yarn build

CMD ["yarn", "start:pm2"]
