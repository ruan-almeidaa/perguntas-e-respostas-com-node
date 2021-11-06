const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const connection = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USER,process.env.DATABASE_PASSWORD,{
    host:process.env.DATABASE_HOST,
    dialect:'postgres',
    ssl: true
})

module.exports = connection;