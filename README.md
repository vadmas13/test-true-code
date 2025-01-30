Node v20.12.1

запуск бэка (через докер): 
cd backend
npm run docker:up

.env файл (в папке backend): 
BASE_URL="http://localhost:3000/api"
DATABASE_URL="postgresql://root:12345@localhost:5432/test_true_code_db"
NODE_ENV=development


запуск фронта:
cd fronend
npm i 
npm run dev

.env файл (в папке fronend): 
VITE_APP_HOST=http://localhost:3001/api
