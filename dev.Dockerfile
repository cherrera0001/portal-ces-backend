FROM node:12-alpine

WORKDIR /src

COPY . /src

RUN npm ci --quiet

EXPOSE 8085

CMD [ "npm", "run", "dev" ]
