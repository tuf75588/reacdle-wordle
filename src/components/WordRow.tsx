import { LetterState } from '../word-utils';
import { LETTER_LENGTH } from '../word-utils';

type Letters = {
  letters: string;
  result?: LetterState[];
};

function WordRow({ letters: lettersProp = '', result = [] }: Letters) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(lettersRemaining).fill(''));
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char, i) => (
        <CharacterBox value={char} key={i} state={result[i]} />
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
      className={`inline-block mx-1 border border-1 border-gray-500 p-4 uppercase font-bold text-center ${stateStyles}
      before:inline-block before:content-['_']
      `}
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
