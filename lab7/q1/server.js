const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function startServer() {

    await client.connect();

    db = client.db("studentNotesDB");

    console.log("MongoDB Connected");

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

startServer();

app.post("/notes", async (req, res) => {

    const note = req.body;

    note.created_date = new Date();

    const result = await db.collection("notes").insertOne(note);

    res.send(result);

});

app.get("/notes", async (req, res) => {

    const notes = await db.collection("notes").find().toArray();

    res.send(notes);

});


app.put("/notes/:id", async (req, res) => {

    const id = req.params.id;

    const result = await db.collection("notes").updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
    );

    res.send(result);

});


app.delete("/notes/:id", async (req, res) => {

    const id = req.params.id;

    const result = await db.collection("notes").deleteOne(
        { _id: new ObjectId(id) }
    );

    res.send(result);

});