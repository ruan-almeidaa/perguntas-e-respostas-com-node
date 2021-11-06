const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas",{
    idResposta:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    corpo:{
        type: Sequelize.TEXT,
        allowedNull : false,
    },

    perguntaId:{
        type: Sequelize.INTEGER,
        allowedNull: false
    }
});

Resposta.sync({force: false}).then(() => {
});

module.exports = Resposta;