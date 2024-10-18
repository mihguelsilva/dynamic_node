# Dynamic Server

The main goal on this project it's to put in practice all my knowledge about NodeJS native modules. Of course, this project won't be entirely ended in a week, once, I'm plan every step, however, the main goal is ready, which is an dynamic server.

## What show I plan?

This project isn't for only access, as we normally do in an web site, however, I wish to manipulate with the FS system through and so on, and this includes:

- Create/Remove directories;
- Create/Remove files;
- Write/Delete data;
- CRUD;

Probably, I'll work with database too, however, this is for future, for now, I'll focus on the main goals.

## First step

This is an HTTP2 server, which means it uses criptography, so, to put this on work, we must create our pair key/cert files. In this example, I put them into an instance path, however, you can place it wherever you wish for.

``` bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout /path/to/localhost-privkey.pem -out /path/to/localhost-cert.pem
```

*OBS*: The code shown before was based on NodeJS's HTTP2 documentation, however, all the steps follows a different ideia, besides the needing to accomplish the sames steps, once it's documentation specifies how it works.

After doing this, we must place our pair key/cert files into our HTTP2 server. Do as you wish.

``` js
'use-strict';
const key = '/path/to/localhost-privkey.pem',
	cert = '/path/to/localhost-cert.pem',
	address = 'ip address',
	port = port

import http2 from 'node:http2';
import fs from 'node:fs';

http2.createSecureServer({
	'key': fs.readFileSync(key),
	'cert': fs.readFileSync(cert)
}).on('error', function(e) {
	console.error(e);
}).on('request', function(req, res) {
}).listen(port, address, function() {
	console.log('Server successfully initialized!');
}); 
console.log(`Server listening on ${address}:${port}!`);
```
