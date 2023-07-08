import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from "fs";
import path from 'path';

const filePath = path.join(process.cwd(), '/src/json/data.json');

const saveFormData = async (data: any) => {
  const existingData = await getFormData();
  const jsonData = JSON.stringify(existingData);
  console.log(jsonData);
  await fs.writeFile(filePath, jsonData);
};

const getFormData = async (): Promise<any[]> => {
    const jsonData = await fs.readFile(filePath, 'utf8');
    const formData = JSON.parse(jsonData);
    return formData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data)
    saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getFormData();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
