const LETTER_LENGTH = 5;
type Letters = {
  letters: string;
};

function WordRow({ letters: lettersProp = '' }: Letters) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length;
  const letters = lettersProp
    .split('')
    .concat(Array(lettersRemaining).fill(''));
  return (
    <div className="grid grid-cols-5 gap-4">
      {letters.map((char) => (
        <CharacterBox value={char} key={char} />
      ))}
    </div>
  );
}

function CharacterBox({ value }: { value: string }) {
  return (
    <span className="inline-block mx-1 border border-1 border-gray-500 p-4 uppercase font-bold text-center">
      {value}
    </span>
  );
}

export default WordRow;
