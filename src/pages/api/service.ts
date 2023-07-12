// import { NextApiRequest, NextApiResponse } from 'next';
// import fs from 'fs/promises';
// import path from 'path';
import { connect } from "../../../db"

// interface FormData {
//   formData: any[];
// }

// const filePath = path.join(process.cwd(), '/data/data.json');

// const saveFormData = async (data: any) => {
//   const existingData = await getFormData();
//   const formData: FormData = { formData: [...existingData, data] };
//   const jsonData = JSON.stringify(formData);
//   await fs.writeFile(filePath, jsonData);
// };

// const getFormData = async (): Promise<any[]> => {
//   const jsonData = await fs.readFile(filePath, 'utf8');
//   const formData: FormData = JSON.parse(jsonData);
//   return formData.formData;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const data = req.body;
//     saveFormData(data);
//     res.status(200).json({ message: 'Dados salvos com sucesso.' });
//   } else if (req.method === 'GET') {
//     const data = await getFormData();
//     res.status(200).json(data);
//   } else {
//     res.status(405).json({ message: 'Método não permitido.' });
//   }
// }

async function createTable(req: any, res: any) {
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

export default createTable;
