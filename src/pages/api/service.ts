import { NextApiRequest, NextApiResponse } from 'next';
import { sql, createClient } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await createTableIfNotExists(req, res);
  if (req.method === 'POST') {
    const data = req.body;
    insertTask(req, res, data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getTasks(req, res);
    res.status(200).json(data);
  } else {
    throw Error("Método não permitido");
  }
}

export async function createTableIfNotExists(req: any, res: any) {
  const client = createClient();
  await client.connect();
  try {
    const tableExists = await client.query(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'tasks'
    );
  `);

    if (!tableExists.rows[0].exists) {
      await client.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        message VARCHAR(100),
        date VARCHAR(50)
      );
    `);
    }
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  }
}

export async function insertTask(req: any, res: any, data: any) {
  try {
    const title = data.title as string;
    const message = data.message as string;
    const date = data.date as string;
    // Execute o comando SQL de inserção
    await sql`INSERT INTO tasks (title, message, date) VALUES (${title}, ${message}, ${date})`;

  } catch (error) {
    console.error('Erro ao inserir tarefa:', error);
    // res.status(500).json({ error: 'Ocorreu um erro ao inserir a tarefa.' });
  }
}

export async function getTasks(req: any, res: any) {
  try {
    const result = await sql`SELECT * FROM tasks`;
    return result.rows;
    // // Envie a resposta com os dados retornados
    // res.status(200).json({ result });
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    // res.status(500).json({ error: 'Ocorreu um erro ao buscar as tarefas.' });
  }
}