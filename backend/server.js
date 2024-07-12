// Importando módulos usando a sintaxe do ECMAScript
const express = require('express');
const path = require('path');
const compression = require('compression');
const PORT = 3000;
const app = express();
app.use(compression());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Dados para o JSON (simulando dados de um banco de dados)
const dados = {
    1: { titulo: 'Página 1', conteudo: 'Conteúdo da página 1' },
    2: { titulo: 'Página 2', conteudo: 'Conteúdo da página 2' },
    3: { titulo: 'Página 3', conteudo: 'Conteúdo da página 3' }
};

// Rota para renderizar a página home com base no id fornecido na URL
app.get('/:id', (req, res) => {
    const id = req.params.id;
    const pagina = dados[id] || { titulo: 'Página não encontrada', conteudo: 'Página não encontrada' };
    res.render('home', { pagina });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
