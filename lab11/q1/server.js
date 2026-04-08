const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Create server
const server = http.createServer((req, res) => {

    if (req.url === '/' || req.url === '/index.html') {

        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end("Server Error");
            } 
            else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }

        });

    } 
    else {

        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("<h1>404 Page Not Found</h1>");

    }

});

// Run server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});