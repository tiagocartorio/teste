const sql = require('./db.js');

// Função para criar a tabela se ela não existir
const criarTabelaSeNaoExistir = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS dados (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        conteudo VARCHAR(100) NOT NULL
      );
    `;
    console.log('Tabela "dados" verificada/criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar/verificar tabela:', err);
  }
};

const inserirDados = async (dados) => {
  const { titulo, conteudo } = dados;

  try {
    // Verificar/criar tabela antes de inserir dados
    await criarTabelaSeNaoExistir();

    // Inserir dados na tabela
    const res = await sql`
      INSERT INTO dados (titulo, conteudo) 
      VALUES (${titulo}, ${conteudo}) 
      RETURNING *;
    `;
    console.log('Dados inseridos:', res[0]);
  } catch (err) {
    console.error('Erro ao inserir dados:', err);
  }
};

module.exports = inserirDados;
