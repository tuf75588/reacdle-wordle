import { describe, expect, test } from 'vitest';
import App from './App';
import { render, screen, userEvent, within } from './test/test-utils';
import { getRandomWord } from './word-utls';

describe('word-utils', () => {
  test('random word', () => {
    expect(getRandomWord()).toBeTruthy();
    expect(getRandomWord().length).toEqual(5);
  });
});
