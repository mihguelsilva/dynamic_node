import { request, response } from './server.js';
import qs from 'node:querystring';

export function returnPost() {
    let body = '';
    request.on('error', function(e) {
	console.error('Error POST Code: ', e.code);
	console.error('Error POST Message: ', e.message);
    });
    request.on('data', function(chunk) {
	body += chunk;
    });
    request.on('end', function() {
	body = qs.parse(body);
	console.log(body);
	response.end();
    });
}
