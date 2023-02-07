FROM node:lts-alpine3.16
WORKDIR /usr/src/app
COPY . .
RUN yarn install --prod
EXPOSE 8081
CMD ["yarn", "start"]