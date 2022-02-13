import { computeGuess, getRandomWord, LetterState } from '../word-utils';

const LETTER_LENGTH = 5;
type Letters = {
  letters: string;
};

function WordRow({ letters: lettersProp = '' }: Letters) {
  const guessStates = computeGuess(lettersProp);
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(lettersRemaining).fill(''));
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, i) => (
        <CharacterBox value={char} key={i} state={guessStates[i]} />
      ))}
    </div>
  );
}
type CharacterBox = {
  state?: LetterState;
  value?: string;
};
function CharacterBox({ value, state }: CharacterBox) {
  const stateStyles =
    state === undefined || null ? '' : characterStateStyles[state];
  return (
    <span
      className={`inline-block mx-1 border border-1 border-gray-500 p-4 uppercase font-bold text-center ${stateStyles}`}
    >
      {value}
    </span>
  );
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-gray-500 border-gray-500',
  [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
  [LetterState.Match]: 'bg-green-500 border-green-500',
};

export default WordRow;
