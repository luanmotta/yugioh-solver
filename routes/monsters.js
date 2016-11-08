module.exports = function(app) {

  // Rota que retorna todos os monstros
  app.get("/monsters", function(req, res){

    // Cria conexão com a tabela Monstros do banco de dados
    var connection = app.database.connectionFactory(),
        Monsters = new app.database.MonstrosDao(connection);

    // Lista monstros
    Monsters.getAllMonsters(function(err, monstros) {
    
      if (err) {          
        res.status(500).send({"message": "Internal Server Error"});
        console.log(err);
        return;
      }

      // Envia para o client a lista dos com todos os monstros
      res.status(200).send(monstros);
  
    });
    
  });

};

