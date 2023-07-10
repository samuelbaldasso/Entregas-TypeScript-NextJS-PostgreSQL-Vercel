'use server'

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), '/data/data.json');

export async function writeDataToJson(data: any) {
  try {
    await fs.writeFile(filePath, data, 'utf-8');
    console.log('Dados gravados no arquivo JSON com sucesso!');
  } catch (error) {
    console.error('Erro ao gravar os dados no arquivo JSON:', error);
  }
}

export async function readJson() {
  try {
    return await fs.readFile(filePath);
  } catch (error) {
    console.error('Erro ao ler os dados no arquivo JSON:', error);
  }
}
