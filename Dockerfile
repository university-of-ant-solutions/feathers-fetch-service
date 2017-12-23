FROM registry.gitlab.com/particle4dev/docker-node:node-8.9.3-dumb-1.2.1
MAINTAINER Hoang Nam "particle4dev@gmail.com"
LABEL description="This is dockerfile for building tool images <run test, lint, build source code>"

# Set a working directory
WORKDIR /usr/src/app

COPY package.json package-lock.json yarn.lock /usr/src/app/

# Install Node.js dependencies
RUN yarn install

EXPOSE 3000
CMD [ "npm", "run", "test" ]
