// Cria classe responsável por manipular a tabela FusaoSimples
function FusaoSimples(connection) {
    this._connection = connection;
}

// Insere na tabela FusaoSimples um novo registro de fusao simples
FusaoSimples.prototype.createSimpleFusion = function(newSimpleFusion, callback) {
    this._connection.query("INSERT INTO FusaoSimples SET ?", newSimpleFusion, callback);
};

/* Procura por registro de fusão simples recebendo 2 monstros por parâmetro e 
    retorna id do monstro resultado da fusão se houver */
FusaoSimples.prototype.tryFusion = function(monster1Type, monster2Type, callback) {
    this._connection.query(`SELECT monstroFinalId FROM FusaoSimples 
                            WHERE tipo1 = ? AND tipo2 = ? 
                            OR
                            tipo1 = ? AND tipo2 = ?`,
                            [monster1Type, monster2Type, monster2Type, monster1Type], callback);
};

module.exports = function() {
    return FusaoSimples; // Retorna a classe
};