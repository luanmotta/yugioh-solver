// Cria classe responsável por manipular a tabela Usuarios
function Usuarios(connection) {
    this._connection = connection;
}

// Insere na tabela Usuarios um novo usuario
Usuarios.prototype.createUser = function(newUser, callback) {
    this._connection.query("INSERT INTO Usuarios SET ?", newUser, callback);
};

// Busca um usuário através do username enviado no parâmetro
Usuarios.prototype.getUserByUsername = function(username, callback) {
    this._connection.query("SELECT * FROM Usuarios WHERE username = ?", username, callback);
};

module.exports = function(){
    return Usuarios; // Retorna a classe
};