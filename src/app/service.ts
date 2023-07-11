'use server'

import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), '/data/data.json');

export async function writeDataToJson(data: any) {
  let json: any = await readJson();
  if (!Array.isArray(json)) {
    json = [];
  }
  const formData = [...json, data];
  await fs.writeFile(filePath, formData, 'utf-8');
  console.log('Dados gravados no arquivo JSON com sucesso!');
}

export async function readJson() {
  const jsonData = await fs.readFile(filePath, 'utf-8');
  return jsonData;
}

export async function sortDate(data: any) {
  let mappedArr = data.map((e: any) => e.date);
  mappedArr.sort((n1: any, n2: any) => {
    if (n1 > n2) {
      return 1;
    }

    if (n1 < n2) {
      return -1;
    }

    return 0;
  });

  const filteredData = mappedArr.filter((value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
  });

  return filteredData;
}

export async function returnDataByDate(data: any, id: any) {
  let arr = JSON.parse(data);
  const filteredData: any[] = arr.filter((item: any) => item.date === id);
  return filteredData;
}