import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto w-96">
      <h1 className="text-4xl text-center">reacdle</h1>
    </div>
  );
}

export default App;
