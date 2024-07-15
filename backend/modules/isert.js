const inserirDados = require('./insertDB.js');

const novoDado = {
  titulo: 'Página 3',
  conteudo: 'Conteúdo da página 3',
};

inserirDados(novoDado);

module.exports = novoDado
