"use-strict";
import http2 from 'node:http2';
import fs from 'node:fs';
import path from 'node:path';
import { dir } from './class.js';
import { returnPost } from './post.js';
import { returnGet } from './get.js';
import { returnFs } from './dir.js';
export let request = global.request;
export let response = global.response;

const server = http2.createSecureServer({
    key: fs.readFileSync('/opt/certs/localhost-privkey.pem'),
    cert: fs.readFileSync('/opt/certs/localhost-cert.pem')
}).listen(9000);

server.on('error', function(e){
    console.error('Error Server Code: ', e.code);
    console.error('Error Server Message: ', e.message);
});

server.on('request', function(req, res) {
    let endpoint = path.join(dir, req.url);
    if (req.method == 'POST') {
	request = req;
	response = res;
	returnPost();
    } else {
	try {
	    let stat = fs.statSync(endpoint);
	    if (stat.isFile()) {
		request = req;
		response = res;
		returnGet(endpoint);
	    } else if (stat.isDirectory()) {
		request = req;
		response = res;
		returnFs(endpoint);
	    };
	} catch (e) {
	    res.statusCode = 404;
	    res.setHeader('Content-type', 'text/html');
	    res.end('<h1>Page not found</h1><p>Server could not found the page requested.</p>');
	}

    };

});
