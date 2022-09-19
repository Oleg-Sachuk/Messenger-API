FROM node:16.15.0-alpine as BUILD
ARG NODE_ENV=development
ENV NODE_ENV "$NODE_ENV"
ENV PORT 80
EXPOSE 80

WORKDIR /usr/src
COPY src/package.json /usr/src/package.json
COPY src/yarn.lock /usr/src/yarn.lock
RUN yarn

COPY src /usr/src

CMD yarn start
