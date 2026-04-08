const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req,res)=>{

    if(req.url === "/"){

        // CREATE FILE
        fs.writeFile("sample.txt","This is a new file created by Node.js\n",(err)=>{

            if(err) console.log(err);
            else console.log("File created");

            // APPEND DATA
            fs.appendFile("sample.txt","Appending new line\n",(err)=>{

                if(err) console.log(err);
                else console.log("Data appended");

                // READ FILE
                fs.readFile("sample.txt","utf8",(err,data)=>{

                    if(err) console.log(err);
                    else console.log("File Content:\n",data);

                    // SEND WEB PAGE
                    fs.readFile("index.html",(err,html)=>{

                        res.writeHead(200,{'Content-Type':'text/html'});
                        res.write(html);
                        res.end();

                    });

                });

            });

        });

    }

    else if(req.url === "/delete"){

        fs.unlink("sample.txt",(err)=>{

            if(err) console.log(err);
            else console.log("File deleted");

        });

        res.writeHead(200,{'Content-Type':'text/html'});
        res.end("<h2>File Deleted Successfully</h2>");

    }

});

server.listen(PORT,()=>{
console.log("Server running at http://localhost:3000");
});