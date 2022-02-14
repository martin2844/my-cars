FROM node:16.8.0-alpine

#Install python for sqlite3 driver
#sqlite3 driver requires python to compile
RUN apk add --no-cache --virtual .gyp python3 make g++

#Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set python /usr/bin/python3
RUN npm install --legacy-peer-deps

## Bundle app source
COPY . .

RUN npm run build

# Run directly with node
CMD node ./dist/main.js


