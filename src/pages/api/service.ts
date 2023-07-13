import { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from "fs";
import path from 'path';

const filePath = path.join(process.cwd(), '/data/data.json');

async function writeDataToJson(data: any) {
  let json = await readJson();
  const formData = [...JSON.parse(json), data];
  await fs.writeFile(filePath, JSON.stringify(formData), 'utf-8');
  console.log('Dados gravados no arquivo JSON com sucesso!');
}

async function readJson() {
  return await fs.readFile(filePath, 'utf-8');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    await writeDataToJson(data);
    res.status(200).json({ message: 'Dados salvos com sucesso.' });
  } else if (req.method === 'GET') {
    const data = await readJson();
    res.status(200).json(data);
    console.log(data)
  } else {
    throw Error("Método não permitido");
  }
}