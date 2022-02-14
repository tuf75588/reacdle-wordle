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

  addGuess: (guess: string) => void;
  newGame: () => void;
};

export const useStore = create<StoreState>(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      rows: [],
      addGuess: (guess: string) => {
        set((state) => ({
          rows: [
            ...state.rows,
            {
              guess,
              result: computeGuess(guess, state.answer),
            },
          ],
        }));
      },
      newGame: () => {
        set({
          answer: getRandomWord(),
          rows: [],
        });
      },
    }),
    {
      name: 'Reacdle',
    }
  )
);

// useStore.persist.clearStorage();
