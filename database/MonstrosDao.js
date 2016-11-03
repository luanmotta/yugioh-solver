// Cria classe responsável por manipular a tabela monstros
function Monstros(connection) {
    this._connection = connection;
}

// Cria monstro através do objeto passado por parâmetro
Monstros.prototype.createMonster = function(newMonster, callback) {
    this._connection.query("INSERT INTO Monstros SET ?", newMonster, callback);
};

// Busca monstro por seu nome passado por parâmetro
Monstros.prototype.getMonsterByName = function(monsterName, callback) {
    this._connection.query("SELECT * FROM Monstros WHERE nome = ?", monsterName, callback);
};

// Busca monstro referente ao id passado por parâmetro
Monstros.prototype.getMonsterById = function (monsterId, callback) {
    this._connection.query("SELECT * FROM monstros WHERE monsterId = ?", monsterId, callback);
};

module.exports = function(){
    return Monstros; // Retorna a classe
};