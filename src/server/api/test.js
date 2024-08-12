import { promises as fs } from 'fs';
import { defineEventHandler } from 'h3';
import path from 'path';

export default defineEventHandler(async (event) => {
  const id = 1;
  let data = {
    test: true
  };
  try {
    const filePath = path.resolve(process.cwd(), 'src/public/data/test.json');

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    console.log(123)
    return jsonData;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to read saved page data.',
      error: error.message
    };
  }
});