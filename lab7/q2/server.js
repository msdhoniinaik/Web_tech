const express = require("express");

const app = express();

/* serve html files */
app.use(express.static("public"));

/* start server */

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});