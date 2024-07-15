const express = require('express');
const path = require('path');
const compression = require('compression');
const sql = require('./modules/db.js');
const PORT = 3000;
const app = express();

app.use(compression());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const obterDadosPorId = async (id) => {
  try {
    const res = await sql`SELECT * FROM dados WHERE id = ${id}`;
    return res[0];
  } catch (err) {
    return null;
  }
};

const inserirDados = async (username, password) => {
  try {
    await sql`INSERT INTO users (username, password) VALUES (${username}, ${password})`;
    return true;
  } catch (err) {
    console.error('Erro ao inserir dados:', err);
    return false;
  }
};

app.use(express.static(path.join(__dirname, '../public')));

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  const pagina = await obterDadosPorId(id);
  if (pagina) {
    res.render('home', { pagina });
  } else {
    res.render('erro', { url: req.url });
  }
});

app.post('/teste', async (req, res) => {
  const { username, password } = req.body;

  if (username === password) {
    const sucesso = await inserirDados(username, password);
    if (sucesso) {
      res.send("Parabéns, dados inseridos com sucesso!");
    } else {
      res.send("Erro ao inserir dados no banco de dados.");
    }
  } else {
    res.send("Erro, senhas incorretas");
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
