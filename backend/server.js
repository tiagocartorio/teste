const express = require('express')
const path = require('path')
const compression = require('compression')
const sql = require('./modules/db.js')
const PORT = 3000
const app = express()
app.use(compression())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
app.use(express.json()); // Middleware para parsear JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear URL-encoded
const obterDadosPorId = async (id) => {
  try {
    const res = await sql`SELECT * FROM dados WHERE id = ${id}`;
    return res[0];
  } catch (err) {
    return null;
  }
}
app.use(express.static(path.join(__dirname, '../public')));
app.get('/:id', async (req, res) => {
  const id = req.params.id
  const pagina = await obterDadosPorId(id)
  if (pagina) {
    res.render('home', { pagina })
  } else {
    res.render('erro', { url: req.url })
  }
})
app.post('/teste', (req, res) => {
  const {username, password} = req.body
  if(username === password){
    res.send("Parabéns")
  }else{
    res.send("Erro, senhas incorretas")
  }
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/','index.html'))
})
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`)
});