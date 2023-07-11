'use server'

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), '/data/data.json');

export async function writeDataToJson(data: any) {
  let json = await readJsonAndSortData();
  if (!Array.isArray(json)) {
    json = [];
  }
  const formData = [...json, data];
  await fs.writeFile(filePath, formData, 'utf-8');
  console.log('Dados gravados no arquivo JSON com sucesso!');
}

async function readJsonAndSortData() {
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  const arr = Object.values(data);
  arr.sort((n1: any, n2: any) => n1.date - n2.date)
  const sortedJsonData: any = arr.reduce((acc: any, obj: any) => {
    acc[obj.date] = obj;
    return acc;
  }, {});
  return sortedJsonData;
}
