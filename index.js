
require('dotenv').config();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb+srv://juliobsl:"+process.env.BD_PASS+"@cluster0.eatyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

function loadClientes(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
          var dbo = db.db("estacionamento");
          dbo.collection("clientes").find({}).toArray(function(err, result) {
              if (err) throw err;
              db.close();
              listaClientes(result);
              
            });
      });
}

loadClientes();

function listaClientes();
