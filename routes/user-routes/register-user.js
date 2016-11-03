var Crypto = require("../../services/Crypto.js");

module.exports = function(app) {

  // Rota para cadastrar um usuário
  app.post("/register", function(req, res){

    var username = req.body.username,
        password = req.body.password,
        password2 = req.body.password2;

    // funções do express validator para validar os dados de entrada
    req.assert("username", "username is required").notEmpty();
    req.assert("password", "Password is required").notEmpty();
    req.assert("password2", "Passwords do not match").equals(password);

    var errors = req.validationErrors();

    // Caso haja erros na entrada de dados
    if (errors) {
      res.status(400).send(errors);
      console.log("validation errros");
      return;
    } 

      // Conecta com a tabela users do banco de dados
      var connection = app.database.connectionFactory(),
          Users = new app.database.UsersDao(connection);

      // Verifica se já há um usuário com o mesmo username cadastrado
      Users.getUserByUsername(username, function(err, user) {

        if (err) {
          res.status(500).send({"message": "Internal Server Error"});
          console.log(err);
          return;
        }

        if (user[0]) {
          res.status(400).send({"message": "Bad Request"});
          console.log("Bad Request");
          return;
        }

        // Cria modelo de usuário para inserir no banco de dados
        var newUser = {
          username: username,
          password: password
        };

        // Criptografa password do usuário
        Crypto.cryptoPassword(newUser, function() {

          // Cadastra no banco o novo usuário
          Users.createUser(newUser, function(err2){

          if (err) {
            res.status(500).send({"message": "Internal Server Error"});
            console.log(err2);
            return;
          } 

          // Retorna o novo usuário
          res.status(201).send({"message": "Created"});

          });
          
        });

      });  
  });

};

