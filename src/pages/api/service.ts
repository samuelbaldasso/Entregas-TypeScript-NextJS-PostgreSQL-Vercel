import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from "../../../db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await createTable(req, res);
  if (req.method === 'POST') {
    const data = req.body;
    insertTask(req, res, data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getTasks(req, res);
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}

export async function createTable(req: any, res: any) {
  try {
    // Estabeleça a conexão com o banco de dados
    const client = await connect();

    // Execute o comando SQL para criar a tabela
    await client.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        message VARCHAR(100),
        date TIME
      );
    `);

    // Envie uma resposta de sucesso
    res.status(200).json({ message: 'Tabela criada com sucesso.' });

    // Encerre a conexão
    await client.end();
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao criar a tabela.' });
  }
}

export async function insertTask(req: any, res: any, data: any) {
  try {
    // Estabeleça a conexão com o banco de dados
    const client = await connect();

    // Execute o comando SQL de inserção
    await client.query(
      'INSERT INTO tasks (title, description, date) VALUES ($1, $2, $3)',
      [data.title, data.description, data.date]
    );

    // Envie uma resposta de sucesso
    res.status(200).json({ message: 'Usuário inserido com sucesso.' });

    // Encerre a conexão
    await client.end();
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao inserir o usuário.' });
  }
}

export async function getTasks(req: any, res: any) {
  try {
    // Estabeleça a conexão com o banco de dados
    const client = await connect();

    // Execute o comando SQL de seleção
    const result = await client.query('SELECT * FROM tasks');

    // Envie a resposta com os dados retornados
    res.status(200).json(result.rows);

    // Encerre a conexão
    await client.end();
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os usuários.' });
  }
}