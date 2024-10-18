import { request, response } from './server.js';
import { dir, mimeTypes } from './class.js';
import fs from 'node:fs';
import path from 'node:path';

export function returnFs(endpoint) {
    try {
	response.setHeader('Content-type', 'text/html');
	response.statusCode = 200;
	response.write('<!DOCTYPE html>');
	response.write('<head>');
	response.write('<script src="/js/index.js"></script>');
	response.write('</head>');
	response.write('<body>');
	response.write('<nav id="fs">');
	response.write('<ul>');
	let directory = fs.readdirSync(endpoint);
	for (let a in directory) {
	    let newEndpoint = path.join(endpoint, directory[a]);
	    try {
		if (fs.statSync(newEndpoint).isDirectory()) {
		    let level = path.parse(newEndpoint)['name'];
		    newEndpoint = path.join(request.url, level);
		    createLi(level, newEndpoint, 'dir');
		} else if (fs.statSync(newEndpoint).isFile()) {
		    let level = path.parse(newEndpoint)['base'];
		    newEndpoint = path.join(request.url, level);
		    createLi(level, newEndpoint, 'file');
		};
	    }catch(e) {
		console.error(e);
	    }
	};
    } catch(e) {
	console.error(e);
    }
    response.write('</body>');
    response.write('</ul>');
    response.write('</nav>');
    response.end();
};
function createLi(value, href, htmlClass) {
    response.write('<li>');
    response.write(`<a href=${href} class='${htmlClass}'>${value}</a>`);
    response.write('</li>');
};
