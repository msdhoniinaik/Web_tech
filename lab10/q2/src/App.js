import React, { useState } from "react";
import "./App.css";

function App() {

  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if(input.trim() === "") return;

    const newItem = {
      id: Date.now(),
      text: input
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container">

      <h1>Item List</h1>

      <input
        type="text"
        placeholder="Enter item"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
      />

      <button onClick={addItem}>Add</button>

      {items.length === 0 ? (
        <p>No items available</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.text}
              <button onClick={()=>removeItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default App;