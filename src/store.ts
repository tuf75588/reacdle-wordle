import create from 'zustand';
import { persist } from 'zustand/middleware';
import { computeGuess, getRandomWord } from './word-utils';
import { LetterState } from './word-utils';

type GuessRow = {
  guess: string;
  result?: LetterState[];
};

// You can use `type`
type StoreState = {
  answer: string;
  rows: GuessRow[];
  gameState: 'playing' | 'won' | 'lost';
  addGuess: (guess: string) => void;
  newGame: () => void;
};

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      rows: [],
      gameState: 'playing',
      addGuess: (guess: string) => {
        const result = computeGuess(guess, get().answer);
        const didWin = result.every((letter) => letter === LetterState.Match);
        const rows = [
          ...get().rows,
          {
            guess,
            result,
          },
        ];
        set((state) => ({
          rows,
          gameState: didWin ? 'won' : rows.length === 6 ? 'lost' : 'playing',
        }));
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          rows: [],
          gameState: 'playing',
        });
      },
    }),
    {
      name: 'Reacdle',
    }
  )
);

// useStore.persist.clearStorage();
