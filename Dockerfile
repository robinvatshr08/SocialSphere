
FROM node:20-alpine

WORKDIR /app


COPY package*.json ./
RUN npm ci --omit=dev

RUN npm install


COPY . .

ENV NODE_ENV=production
ENV PORT=3003

EXPOSE 3003

CMD ["npm", "start"]
