const http = require('http');
const fs = require('fs');
const events = require('events');

// Create EventEmitter object
const eventEmitter = new events.EventEmitter();

const PORT = 3000;

/* ---------- EVENT LISTENERS ---------- */

// Listener 1
eventEmitter.on('userLogin', (username) => {
    console.log("Listener 1: User logged in -> " + username);
});

// Listener 2 (multiple listeners for same event)
eventEmitter.on('userLogin', (username) => {
    console.log("Listener 2: Welcome message sent to -> " + username);
});

// Another event
eventEmitter.on('pageVisited', (page) => {
    console.log("Page visited: " + page);
});


/* ---------- SERVER ---------- */

const server = http.createServer((req,res)=>{

    if(req.url === "/"){
        
        // Trigger event
        eventEmitter.emit('pageVisited',"Home Page");

        fs.readFile("index.html",(err,data)=>{
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data);
            res.end();
        });

    }

    else if(req.url === "/login"){

        // Trigger event with data
        eventEmitter.emit('userLogin',"Student");

        res.writeHead(200,{'Content-Type':'text/html'});
        res.end("<h2>User Login Event Triggered. Check Terminal.</h2>");

    }

});

server.listen(PORT,()=>{
console.log("Server running at http://localhost:3000");
});