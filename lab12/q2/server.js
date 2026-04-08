const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use((req, res, next) => {
    console.log("Request Method:", req.method);
    console.log("Request URL:", req.url);
    console.log("Timestamp:", new Date().toLocaleString());
    next(); // move to next middleware
});

app.use((req, res, next) => {
    console.log("Middleware Layer 2 Executed");
    next();
});



const checkUser = (req, res, next) => {
    console.log("Route-specific middleware executed");
    next();
};


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/about', checkUser, (req, res) => {
    res.send("<h2>About Page - Middleware Executed</h2>");
});


app.get('/products', (req, res) => {
    res.send("<h2>Products Page</h2>");
});




app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});