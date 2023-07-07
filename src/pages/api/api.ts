import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const path = require("path");

const filePath = path.join(process.cwd(), "/src/json");

// const saveFormData = async (data: any) => {
//   const jsonData = JSON.stringify({ formData: [...await getFormData(), data] });
//   await fs.writeFileSync(filePath, jsonData);
// };

const getFormData = async () => {
  return await fs.readFile(filePath + '/data.json', 'utf8');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    // saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await getFormData();
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
}
