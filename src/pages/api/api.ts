import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const path = require("path");

const filePath = path.join(process.cwd(), "/var/task/public/data.json");
console.log(filePath)

const saveFormData = async (data: any) => {
  let arr = await getFormData();
  const jsonData = JSON.stringify({ formData: [...arr, data] });
  await fs.writeFile(filePath, jsonData);
}

const getFormData = async () => {
  return await fs.readFile(filePath, 'utf8').then((e)=> JSON.parse(e).formData);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const data = req.body;
    saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getFormData()
    console.log(data);
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
}
}