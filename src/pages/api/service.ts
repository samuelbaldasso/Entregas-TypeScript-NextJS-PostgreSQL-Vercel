import { NextApiRequest, NextApiResponse } from 'next';
import { sql, createClient } from "@vercel/postgres";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await createTableIfNotExists(req, res);
    if (req.method === 'POST') {
      const data = req.body;
      await insertTask(req, res, data);
      res.status(201).json({ message: 'Task inserted successfully' });
    } else if (req.method === 'GET') {
      const data = await getTasks(req, res);
      res.status(200).json(data);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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
  } finally {
    client.end();
  }
}

export async function insertTask(req: any, res: any, data: any) {
  try {
    const title = data.title as string;
    const message = data.message as string;
    const date = data.date as string;

    await sql`INSERT INTO tasks (title, message, date) VALUES (${title}, ${message}, ${date})`;

  } catch (error) {
    console.error('Erro ao inserir tarefa:', error);

  }
}

export async function getTasks(req: any, res: any) {
  try {
    const result = await sql`SELECT * FROM tasks`;
    return result;
  } catch (error) {
    console.error('Error ao buscar tarefas:', error);
  }
}