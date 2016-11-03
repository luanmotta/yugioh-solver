var express             = require("express"),
    consign             = require("consign"),
    bodyParser          = require("body-parser"),
    expressValidator    = require("express-validator"),
    session             = require("express-session"),
    passport            = require("passport");


module.exports = function() {
  var app = express();
  
  // Tornando possível que a aplicação use json no rest
  app.use(bodyParser.urlencoded({extended : true}));
  app.use(bodyParser.json());

  // Iniciliazando e configurando express session
  app.use(session({
      secret: "secret",
      saveUninitialized: true,
      resave: true
  }));

  // Inicializando passport
  app.use(passport.initialize());
  app.use(passport.session());


  // Inicializando express validator
  app.use(expressValidator());

  // Criando variável global para saber quando o usuário está logado
  app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
  });

  // Consign : Carregando arquivos dentro de app
  consign()
    .include("database")
    .then("services")
    .then("routes")
    .into(app);

  // Configurando passport e inicializando algumas de suas aplicações
  require("../services/passport-config.js")(function () {
    var connection = app.database.connectionFactory(),
        Users = new app.database.UsersDao(connection);
        return Users;  
  });

  return app;
};
