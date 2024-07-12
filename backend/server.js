// Importando módulos usando a sintaxe do ECMAScript
const express = require('express')
const path = require('path')
const compression = require('compression');
const PORT = 3000;
// Criando uma instância do Express
const app = express();
app.use(compression());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.get('/sobre', (req, res) => {
    res.render('home');
});
// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
