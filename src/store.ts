import create from 'zustand';
import { persist } from 'zustand/middleware';
import { getRandomWord } from './word-utils';

// You can use `type`
type BearState = {
  answer: string;
  guesses: string[];
  name?: string;
  addGuess: (guess: string) => void;
};

export const useStore = create<BearState>(
  persist(
    (set) => ({
      answer: getRandomWord(),
      guesses: ['hello', 'solar', 'penny'],
      addGuess: (guess: string) => {
        set((state) => ({
          ...state,
          guesses: [...state.guesses, guess],
        }));
      },
    }),
    {
      name: 'Reacdle',
    }
  )
);

// useStore.persist.clearStorage();
