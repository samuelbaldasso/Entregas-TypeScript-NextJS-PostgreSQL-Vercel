import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const path = require("path");

const filePath = path.join(process.cwd(), "/src/json");

const saveFormData = async (data: any) => {
  let arr = [];
  arr.push(await getFormData());
  const jsonData = JSON.stringify({ formData: [...arr, data] });
  await fs.writeFile(filePath, jsonData);
  arr.push(jsonData);
}

const getFormData = async () => {
  await fs.readFile(filePath + '/data.json', 'utf8');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = getFormData().then((e: any) => {
      return JSON.parse(e);
    });
    console.log(filePath)
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
