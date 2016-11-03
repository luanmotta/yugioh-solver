// Classe responsável por funções de criptografia 

var bcrypt = require("bcryptjs");

function Crypto() {}

// Compara se o password enviado combina com o password criptografado
Crypto.prototype.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if (err) throw err;
    	callback(null, isMatch);
	});
};

// Criptografa password do usuário
Crypto.prototype.cryptoPassword = function(newUser, callback) {

  bcrypt.genSalt(10, function(err, salt) { // gera chave de criptografia
      bcrypt.hash(newUser.password, salt, function(err2, hash) { // transforma o password em string criptografada
        newUser.password = hash;
        callback();
      });
  });
};

module.exports = new Crypto(); // Retorna um objeto já instanciado da classe de criptografia