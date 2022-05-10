var http = require('http');
var url = require('url');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const bodyParser = require("body-parser");



var url = "mongodb+srv://juliobsl:"+process.env.BD_PASS+"@cluster0.eatyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/clientes', (req, res) => {
    console.log('Listando clientes...');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("estacionamento");
          dbo.collection("clientes").find({}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              res.send(result);     
              db.close();         
            });
      });
});

app.get('/patio', (req, res) => {
    console.log('Listando pátio...');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("patio");
          dbo.collection("controle").find({}).toArray(function(err, result) {
              if (err) throw err;
              //console.log(result);
              res.send(result);     
              db.close();         
            });
      });
});

app.post('/add_car_patio',(request,response) => { 
    console.log("Adicionando carro #",request.body.codigocar," no pátio");
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let year = date_ob.getFullYear();

    var registro = {tipo: 'entrada', data: date+"/"+month+"/"+year, hora: hours + ":" + minutes ,codigo: request.body.codigocar,placa: request.body.placa, modelo: request.body.modelo, idcliente: request.body.codigocar};
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("patio");
        dbo.collection("controle").insertOne(registro, function(err, res) {
            if (err) throw res;
            console.log("Carro inserido");
            db.close();
        });
    });
});
app.post('/rm_car_patio',(request,response) => {   
    console.log(request.body.idcarro);
});


app.listen(port, () => {
  console.log(`Servidor na porta: ${port}`)
})
