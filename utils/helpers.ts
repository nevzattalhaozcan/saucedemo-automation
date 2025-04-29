import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

export function readCSVFile(filePath: string) {
  const absolutePath = path.resolve(__dirname, filePath); // Resolve the absolute path
  const fileContent = fs.readFileSync(absolutePath);
  return parse(fileContent, {
    columns: true,          // treat first row as column headers
    skip_empty_lines: true, // ignore empty lines
    trim: true              // remove spaces
  });
}
