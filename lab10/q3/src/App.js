import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if(!response.ok){
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

  }, []);

  return (
    <div className="container">

      <h1>User List</h1>

      {loading && <p>Loading data...</p>}

      {error && <p className="error">{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;