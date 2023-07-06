import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const filePath = './data.json';

const saveFormData = (data: any) => {
  const jsonData = JSON.stringify({ formData: [...getFormData(), data] });
  fs.writeFileSync(filePath, jsonData);
};

const getFormData = () => {
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const parsedData = JSON.parse(jsonData);
  return parsedData.formData || [];
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;
    saveFormData(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = getFormData();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Método não permitido.' });
  }
};

export default handler;
