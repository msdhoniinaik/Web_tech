import React, { useState } from "react";
import "./App.css";

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(name === "" || email === "" || password === ""){
      setError("All fields are required");
      return;
    }

    if(!email.includes("@")){
      setError("Enter a valid email");
      return;
    }

    setError("");

    alert("Form Submitted Successfully");

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">

      <h1>User Registration</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit</button>

      </form>

    </div>
  );
}

export default App;