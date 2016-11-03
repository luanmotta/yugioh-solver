var passport = require("passport");

module.exports = function(app) {  

  // Rota para o usuário realizar login
  app.post("/login", function(req, res, next) {

    // Autenticando usuário
    passport.authenticate("local", function(err, user) {
      if (err) return next(err); 
      
      if (!user) {
         return res.status(401).send({"message": "401 Unauthorized"}); 
      }

      req.logIn(user, function(err) {
        if (err) return next(err);
        
        return res.status(200).send({"message": "OK"});
      });

    })(req, res, next);

  });
};