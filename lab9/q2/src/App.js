import React from "react";
import "./App.css";

function StudentCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p><b>Department:</b> {props.department}</p>
      <p><b>Marks:</b> {props.marks}</p>
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1>Student Details</h1>

      <StudentCard 
        name="Rahul" 
        department="Computer Science" 
        marks="85"
      />

      <StudentCard 
        name="Varun Sajid" 
        department="Information Technology" 
        marks="90"
      />

      <StudentCard 
        name="Dhoni" 
        department="Electronics" 
        marks="88"
      />

    </div>
  );
}

export default App;