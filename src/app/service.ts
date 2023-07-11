'use server'

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), '/data/data.json');

export async function writeDataToJson(data: any) {
  let json = await readJson();
  if (!Array.isArray(json)) {
    json = [];
  }
  const formData = [...json, data];
  await fs.writeFile(filePath, JSON.stringify(formData), 'utf-8');
  console.log('Dados gravados no arquivo JSON com sucesso!');
}

async function readJson() {
  const jsonData = await fs.readFile(filePath, 'utf-8');
  if (jsonData.trim() === '') {
    console.log('O arquivo JSON está vazio.');
    return {};
  }
  const data = JSON.parse(jsonData);
  return data;
}
