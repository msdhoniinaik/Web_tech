import React, { useState } from "react";
import "./App.css";

function App() {

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="container">
      <h1>React Counter</h1>

      <h2>{count}</h2>

      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>

    </div>
  );
}

export default App;