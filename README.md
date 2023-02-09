# Server

## Project setup

Install all dependencies using command `npm install`

Run `docker compose up` to bring up postgres and PGadmin

Run `npx sequelize db:create` to create a database

Run `npx sequelize db:migrate:all` to migrate all Models

Run `npx sequelize db:seed:all` to seed all test data

Visit `http://localhost:5050` to access PGadmin

UserEmail: admin@admin.com
Password: root

Refer `.env` file more information about database
