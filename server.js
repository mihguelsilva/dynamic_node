"use-strict";
import http2 from 'node:http2';
import fs from 'node:fs';
import { dir } from './class.js';

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
	// call post file
    } else {
	try {
	    let stat = fs.statSync(endpoint);
	    if (stat.isFile()) {
		// call get method
	    } else if (stat.isDirectory()) {
		// call dir file
	    };
	} catch (e) {
	    res.statusCode = 403;
	    res.setHeader('Content-type', 'text/html');
	    res.end('<h1>Error Permission</h1><p>Permission file denied. Please, call admin</p>');
	}
    };
    }catch(e) {
	console.error(e);
	res.statusCode = 404;
	res.setHeader('Content-type', 'text/html');
	res.end('<h1>Page not Found</h1><p>The page requested could not be found by server</p>');
    }
});
