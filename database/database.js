const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
const connection = new Sequelize("DATABASE_NAME","DATABASE_USER","DATABASE_PASSWORD",{
    host:"DATABASE_HOST",
    dialect:'postgres',
    protocol:'postgres',
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = connection;