// Importando módulos usando a sintaxe do ECMAScript
const express = require('express')
const path = require('path')
const compression = require('compression')
const sql = require('./modules/db.js')
const PORT = 3000
const app = express()
app.use(compression())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))
const obterDadosPorId = async (id) => {
  try {
    const res = await sql`
      SELECT * FROM dados WHERE id = ${id}
    `
    return res[0];
  } catch (err) {
    console.error('Erro ao obter dados:', err)
    return null
  }
};
app.get('/:id', async (req, res) => {
  const id = req.params.id
  const pagina = await obterDadosPorId(id)
  if (pagina) {
    res.render('home', { pagina })
  } else {
    res.status(404).render('home', { pagina: { titulo: 'Página não encontrada', conteudo: 'Página não encontrada' } })
  }
})
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`)
})
