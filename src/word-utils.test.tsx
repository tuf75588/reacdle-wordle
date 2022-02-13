import { describe, expect, test } from 'vitest';
import App from './App';
import { render, screen, userEvent, within } from './test/test-utils';
import { computeGuess, getRandomWord, LetterState } from './word-utils';

describe('word-utils', () => {
  test('random word', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
  test('it works with all matches', () => {
    expect(computeGuess('boost', 'boost')).toEqual([
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
      LetterState.Match,
    ]);
  });
  test('only does one match when two letters exist', () => {
    expect(computeGuess('boost', 'basic')).toEqual([
      LetterState.Match,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Present,
      LetterState.Miss,
    ]);
  });
  test('full miss', () => {
    expect(computeGuess('boost', 'guard')).toEqual([
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
      LetterState.Miss,
    ]);
  });
});
