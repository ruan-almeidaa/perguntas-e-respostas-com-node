const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");
let connection = 'string de conexão';

if (process.env.DATABASE_URL) {
    connection = new Sequelize(process.env.DATABASE_URL,{
        dialect:'postgres',
        protocol:'postgres',
        dialectOptions:{
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}else {
    // the application is executed on the local machine
    connection = sequelize = new Sequelize('perguntaserespostas', 'postgres', 'postgres',{
        host:'localhost',
        dialect:'postgres'
    });
  }

module.exports = connection;
  