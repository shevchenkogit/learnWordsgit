FROM openjdk:17-alpine

RUN apk add --no-cache bash

RUN mkdir /app
WORKDIR /app

COPY volumes/backend /app

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh