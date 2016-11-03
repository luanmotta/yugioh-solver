var app = require("./config/custom-express.js")(); // configura e inicializa a aplicação

app.listen(3000, function() {
  console.log("Server on port 3000.");
});