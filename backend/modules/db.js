const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
  options: `project=${ENDPOINT_ID}`,
});

async function getPgVersion() {
  try {
    const result = await sql`SELECT version()`;
    console.log("Conectado ao banco de dados:", result);
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  }
}

getPgVersion();

module.exports = sql;
