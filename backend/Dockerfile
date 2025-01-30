FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV BASE_URL="http://localhost:3001/api"
ENV DATABASE_URL="postgresql://root:12345@postgres:5432/test_true_code_db" 
ENV NODE_ENV="development"

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/main"]