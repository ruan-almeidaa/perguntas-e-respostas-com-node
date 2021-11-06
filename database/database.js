const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const connection = new Sequelize("DATABASE_NAME","DATABASE_USER","DATABASE_PASSWORD",{
    host:"DATABASE_HOST",
    dialect:'postgres',
    ssl: true
})

module.exports = connection;