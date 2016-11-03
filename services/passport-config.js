var passport      = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    Crypto        = require("../services/Crypto.js");

var createConnection;

// Função responsável de configurar e utilizar propriedades do passport
module.exports = function (connection) {

  createConnection = connection; // Armazena função de como criar uma nova conexão

  passport.use(new LocalStrategy({ // configurando estratégia local de login
      usernameField: "username", // setando username como campo de identificação do sistema
      passwordField: "password" // setando password como campo de autenticação do sistema
    },
    function(username, password, done) {

      // Cria conexão com a tabela users do banco de dados
      var Users = createConnection();

      // Procura usuário pelo username enviado
      Users.getUserByUsername(username, function(err, user) {
        if (err) console.log(err);
        if (!user[0]){
          return done(null, false, {message: "Unknown User"});
        }

        // Compara se o password enviado combina com o password criptografado armazenado no banco de dados
        Crypto.comparePassword(password, user[0].password, function(err, isMatch) {
          if (err) console.log(err);
          if (isMatch) {
            // Se correto
            return done(null, user);
          } else {
            return done(null, false, {message: "Invalid password"});
          }
        });
      });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user[0].id);
  });

  passport.deserializeUser(function(id, done) {

    var Users = createConnection();

    Users.getUserById(id, function(err, user) {
      done(err, user);
    });
  });
};