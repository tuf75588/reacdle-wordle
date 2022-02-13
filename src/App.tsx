import { useState } from 'react';
import './App.css';
import WordRow from './components/WordRow';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        <h2 className="text-2xl text-center">
          Made with <span role="emoji">💘</span> by Andrew (&lt;atd285&gt;)
        </h2>
      </header>
      <main className="grid grid-rows-6 gap-4">
        <WordRow letters="hello" />
        <WordRow letters="solar" />
        <WordRow letters="penny" />
        <WordRow letters="snack" />
        <WordRow letters="stare" />
      </main>
    </div>
  );
}

export default App;
