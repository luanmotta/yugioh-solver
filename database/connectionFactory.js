var mysql = require("mysql");

// Função para criar conexão com o banco de dados
function createDBConnection(){
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "yugiohdb"
  });
}

module.exports = function() {
  return createDBConnection; // Exporta a função
};