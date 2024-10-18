"use-strict";
import { request, response } from './server.js';
import { dir, mimeTypes } from './class.js';
import path from 'node:path';
import fs from 'node:fs';
let mimes = mimeTypes();

export function returnGet(endpoint) {
    let file = fs.createReadStream(endpoint);
    let contentType = mimes[path.extname(endpoint)] || 'text/plain';
    file.on('open', function() {
	response.statusCode = 200;
	response.setHeader('Content-type', contentType);
	file.pipe(response);
    });
    file.on('error', function(e) {
	console.error(e);
	response.statusCode = 403;
	response.setHeader('Content-type', 'application/json');
	response.end(e);
    });
}
