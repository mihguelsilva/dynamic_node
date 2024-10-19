import { request, response } from './server.js';
import { dir, mimeTypes } from './class.js';
import fs from 'node:fs';
import path from 'node:path';
let directory = "";
let level = 0;

export function returnFs(endpoint) {
    response.setStatus = 200;
    response.setHeader('Content-type', 'text/html');
    response.write('<!DOCTYPE html>');
    response.write('<html>');
    response.write('<head>');
    response.write('<script src="/js/index.js"></script>');
    response.write('</head>');
    response.write('<body>');
    response.write('<section id="navigator">');
    response.write('<nav class="base"><ul>');
    directory = path.join(endpoint, directory);
    readDir(directory);
    directory = "";
    response.write('</ul></nav>');
    response.write('</section>');
    response.write('</body>');
    response.end();
};
function fsStat(stat) {
    console
    try {
	if (fs.statSync(stat).isDirectory()) {
	    checkElement('dir', true);
	} else if (fs.statSync(stat).isFile()) {
	    checkElement('file', false);
	} else if (fs.statSync(stat).isSymbolicLink()) {
	    checkElement('symbolic', false);
	}
	function checkElement(type, checkDir) {
	    let baseName = path.parse(stat)['name'];
	    switch(type) {
	    case "dir":
		let dirName = baseName.charAt(0).toUpperCase() + baseName.slice(1,100);
		response.write(`<li id='${baseName}' class='base'>${dirName}<nav class='sub' id='sub-${baseName}'><ul>`);
		break;
	    case "file":
		let href = path.join('/', stat.replace(directory, ''));
		response.write(`<li><a href=${href}>${baseName}</a></li>`);
	    }
	    if (checkDir == true) {
		readDir(stat);
		response.write('</ul></nav></li>');
	    };
	}
    }catch(e) {
	console.error(e);
    };
};
function readDir(dir) {
    try {
	let filter = new RegExp(/^.*(.git|.js|.json|.md|LICENSE|.bkp|.ico|style|js|data|favicon)$/);
	for (let a in fs.readdirSync(dir)) {
	    if (!fs.readdirSync(dir)[a].match(filter)) {
		let newDir = path.join(dir, fs.readdirSync(dir)[a]);
		fsStat(newDir);
	    };
	};
    }catch(e) {
	console.error(e);
    }
};
