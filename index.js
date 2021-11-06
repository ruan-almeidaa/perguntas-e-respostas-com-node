const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

connection
    .authenticate()
    .then(() => {
        console.log("conexao feita com o banco de dados.")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get("/", (req,res) => {
    Pergunta.findAll({raw: true, order:[
        ['idPergunta','DESC']
    ]}).then(perguntas =>{
        res.render("index",{
            perguntas: perguntas
        });
    }).catch((msgErro) => {
        console.log(msgErro)
    })
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar")

})

app.post("/salvarpergunta", (req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() =>{
        res.redirect("/");
    })
});

app.get("/pergunta/:idPergunta", (req, res) => {
    var id = req.params.idPergunta;
    Pergunta.findOne({
        where:{idPergunta : id}
        
    }).then(pergunta =>{
        if(pergunta != undefined){

            Resposta.findAll({
                where: {perguntaId: pergunta.idPergunta},
                order:[
                    ['idResposta','DESC']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta : pergunta,
                    respostas : respostas
                });
            }).catch((msgErro) => {
                console.log(msgErro)
            })

        }else{
            res.redirect("/");
        }
    })
});

app.post("/salvarresposta", (req,res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo : corpo,
        perguntaId : perguntaId 
    }).then(() =>{
        res.redirect("/pergunta/"+perguntaId);
    })
})

app.listen(process.env.PORT || 8080);