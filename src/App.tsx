import { useState } from 'react';
import './App.css';
import WordRow from './components/WordRow';
import { useStore } from './store';
import { LETTER_LENGTH } from './word-utils';

const GUESS_LENGTH = 6;

function App() {
  const [guess, setGuess] = useState('');
  const state = useStore();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = event.target.value;
    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess);
      setGuess('');
      return;
    }
    setGuess(newGuess);
  };
  let rows = [...state.guesses];

  if (rows.length > 0) {
    rows.push(guess);
  }
  let numOfGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(numOfGuessesRemaining).fill(''));
  return (
    <div className="mx-auto w-96">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        <h2 className="text-2xl text-center">
          Made with <span role="emoji">💘</span> by Andrew (&lt;atd285&gt;)
        </h2>
        <div>{JSON.stringify(guess, null, 2)}</div>
        <input
          type="text"
          value={guess}
          className="w-full p-2 border border-gray-500"
          onChange={onChange}
        />
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map((word, i) => (
          <WordRow key={i} letters={word} />
        ))}
      </main>
    </div>
  );
}

export default App;
