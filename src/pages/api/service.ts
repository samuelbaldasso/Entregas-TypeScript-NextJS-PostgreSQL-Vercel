import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface FormData {
  formData: any[];
}

const filePath = path.join(process.cwd(), '/data/data.json');

const saveFormData = async (data: any) => {
  const existingData = await getFormData();
  const formData: FormData = { formData: [...existingData, data] };
  const jsonData = JSON.stringify(formData);
  await fs.writeFile(filePath, jsonData);
};

const getFormData = async (): Promise<any[]> => {
  const jsonData = await fs.readFile(filePath, 'utf8');
  const formData: FormData = JSON.parse(jsonData);
  return formData.formData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getFormData();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}