import React from "react";
import "./App.css";

function App() {

  const name = "Dhoni";
  const department = "Computer Science";
  const year = "3rd Year";
  const section = "A";

  return (
    <div className="container">
      <h1>Student Profile</h1>

      <div className="profile">
        <p><b>Name:</b> {name}</p>
        <p><b>Department:</b> {department}</p>
        <p><b>Year:</b> {year}</p>
        <p><b>Section:</b> {section}</p>
      </div>

    </div>
  );
}

export default App;