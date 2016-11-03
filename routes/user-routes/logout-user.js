module.exports = function(app) {

  // Rota para o usuário realizar logout
  app.get("/logout", function(req, res){
    req.logout();
    res.status(200).send({"message": "OK"});
  });
};