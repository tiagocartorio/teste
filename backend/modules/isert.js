const inserirDados = require('./insertDB.js')
const novoDado = {
  titulo: 'Página 4',
  conteudo: 'Conteúdo da página 4',
}
inserirDados(novoDado);
module.exports = novoDado
