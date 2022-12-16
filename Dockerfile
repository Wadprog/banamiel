FROM node:14.16.0-alpine3.13
RUN addgroup app && adduser app -S -G app app
USER app 
WORKDIR /app 
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm","run","dev"]
