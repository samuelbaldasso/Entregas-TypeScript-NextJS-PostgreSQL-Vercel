import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

const filePath = path.join(process.cwd(), '/src/json/data.json');

const saveFormData = async (data: any) => {
  try {
    const existingData = await getFormData();
    const jsonData = JSON.stringify({ formData: [...existingData, data] });
    await fs.writeFile(filePath, jsonData);
  } catch (error) {
    throw new Error('Erro ao salvar os dados do formulário.');
  }
};

const getFormData = async () => {
  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData).formData
  } catch (error) {
    return [];
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      await saveFormData(data);
      res.status(200).json({ message: 'Dados salvos com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao salvar os dados do formulário.' });
    }
  } else if (req.method === 'GET') {
    try {
      const data = await getFormData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao obter os dados do formulário.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
