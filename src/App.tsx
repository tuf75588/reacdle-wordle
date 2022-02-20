import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import WordRow from './components/WordRow';
import { useStore, WORD_LENGTH, NUMBER_OF_GUESSES } from './store';
import { LETTER_LENGTH, isValidWord } from './word-utils';
import Keyboard from './components/Keyboard';
const GUESS_LENGTH = 6;

function App() {
  const state = useStore();
  const [guess, setGuess, addGuessLetter] = useGuess();

  const [showInvalidGuess, setInvalidGuess] = useState(false);
  useEffect(() => {
    let id: NodeJS.Timeout;
    if (showInvalidGuess) {
      id = setTimeout(() => setInvalidGuess(false), 1500);
    }

    return () => clearTimeout(id);
  }, [showInvalidGuess]);

  const addGuess = useStore((s) => s.addGuess);
  const previousGuess = usePrevious(guess);
  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === WORD_LENGTH) {
      if (isValidWord(previousGuess)) {
        setInvalidGuess(false);
        addGuess(previousGuess);
      } else {
        setInvalidGuess(true);
        setGuess(previousGuess);
      }
    }
  }, [guess]);

  const isGameOver = state.gameState !== 'playing';

  let rows = [...state.rows];

  let currentRow = 0;
  if (rows.length < NUMBER_OF_GUESSES) {
    currentRow = rows.push({ guess }) - 1;
  }

  const guessesRemaining = NUMBER_OF_GUESSES - rows.length;

  rows = rows.concat(Array(guessesRemaining).fill(''));

  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-gray-500 pb-2 my-2">
        <h1 className="text-4xl text-center">Reacdle</h1>
        <h2 className="text-2xl text-center mb-5">
          Made with <span role="emoji">💘</span> by&nbsp;Andrew&lt;atd285&gt;
        </h2>
      </header>
      <main className="grid grid-rows-6 gap-4">
        {rows.map(({ guess, result }, i) => (
          <WordRow
            key={i}
            word={guess}
            result={result}
            className={
              showInvalidGuess && i === currentRow ? 'animate-bounce' : ''
            }
          />
        ))}
      </main>
      <Keyboard
        onClick={(key) => {
          addGuessLetter(key);
        }}
      />
      <div className="mx-auto text-center mt-2 p-2">
        <a
          href="https://github.com/tuf75588/reacdle-wordle"
          target="_blank"
          className="outline-2 outline-white-300 outline bg-blue-500 rounded p-1 text-white focus:text-black"
        >
          &lt;Source Code /&gt;
        </a>
      </div>
      {isGameOver && (
        <div
          role="modal"
          className="absolute bg-white border border-gray-500 rounded text-center
            w-11/12 h-1/2 p-6 left-0 right-0 mx-auto top-1/4
           grid grid-rows-4"
        >
          <p>Game Over</p>
          <WordRow
            word={state.answer}
            className="items-center justify-items-center"
          />

          <button
            className="border border-green-500 rounded bg-green-500 p-2 mt-4 text-gray-800 shadow"
            onClick={() => {
              state.newGame();
              setGuess('');
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

function useGuess(): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (letter: string) => void
] {
  const [guess, setGuess] = useState('');
  const addGuessLetter = (letter: string) => {
    setGuess((curGuess) => {
      const newGuess =
        letter.length === 1 && curGuess.length !== WORD_LENGTH
          ? curGuess + letter
          : curGuess;

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1);
        case 'Enter':
          if (newGuess.length === WORD_LENGTH) {
            return '';
          }
      }

      if (newGuess.length === WORD_LENGTH) {
        return newGuess;
      }

      return newGuess;
    });
  };
  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key;
    addGuessLetter(letter);
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  return [guess, setGuess, addGuessLetter];
}

// source https://usehooks.com/usePrevious/
function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
