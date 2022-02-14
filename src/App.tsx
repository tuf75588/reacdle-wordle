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
  let rows = [...state.rows];

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess });
  }
  let numOfGuessesRemaining = GUESS_LENGTH - rows.length;
  rows = rows.concat(Array(numOfGuessesRemaining).fill(''));

  const isGameOver = state.rows.length === GUESS_LENGTH;
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        <h2 className="text-2xl text-center mb-5">
          Made with <span role="emoji">💘</span> by Andrew (&lt;atd285&gt;)
        </h2>
        <input
          type="text"
          value={guess}
          className="w-full p-2 border border-gray-500"
          onChange={onChange}
          disabled={isGameOver}
        />
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, i) => (
          <WordRow key={i} letters={guess} result={result} />
        ))}
      </main>
      {isGameOver && (
        <div className="text-center absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded border-2 border-gray-800">
          <h1 role="modal" className="text-2xl">
            Game Over!
          </h1>
          <h2 className="text-lg">
            You used {state.rows.length} out of {GUESS_LENGTH} guesses!
          </h2>
          <h3 className="text-lg">The answer was {state.answer}</h3>
          {/* button that says new game with hover effect */}
          <button
            className="bg-blue-500 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              state.newGame();
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
