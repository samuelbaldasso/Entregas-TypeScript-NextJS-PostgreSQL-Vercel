// Importe as dependências
const { Client } = require('pg');
require('dotenv').config();

// Crie uma função para retornar a conexão com o banco de dados
async function connect() {
  const client = new Client();
  await client.connect();
  return client;
}

// Exporte a função de conexão
module.exports = { connect };
