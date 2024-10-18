"use-strict";
import fs from 'node:fs';
import path from 'node:path';

export const dir = process.cwd();

export function mimeTypes () {
    try {
	let file = fs.readFileSync(path.join(process.cwd(), 'data/mimetypes.json'));
	file = JSON.parse(file);
	return file;
    }catch(e) {
	return e;
    }
}
