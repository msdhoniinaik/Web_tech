const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./studentModel');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/* -------- DATABASE CONNECTION -------- */

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* -------- ROUTES -------- */

// Serve webpage
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});


/* CREATE */
app.post('/students', async (req,res)=>{

    try{
        const student = await Student.create({
            name:req.body.name,
            age:req.body.age,
            course:req.body.course
        });

        res.json(student);

    }catch(err){
        res.send(err);
    }

});


/* READ */
app.get('/students', async (req,res)=>{

    const students = await Student.find();
    res.json(students);

});


/* UPDATE */
app.put('/students/:id', async (req,res)=>{

    const updated = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.json(updated);

});


/* DELETE */
app.delete('/students/:id', async (req,res)=>{

    await Student.findByIdAndDelete(req.params.id);
    res.send("Student deleted");

});


app.listen(PORT,()=>{
console.log("Server running at http://localhost:3000");
});