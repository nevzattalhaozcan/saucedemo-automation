import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import * as path from 'path';

export function readCSVFile(filePath: string) {
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath); // Use process.cwd() for CI compatibility
  const fileContent = fs.readFileSync(absolutePath);
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
}
