import { describe, expect, test } from 'vitest';
import App from './App';
import { useStore } from './store';
import { render, screen, userEvent, within } from './test/test-utils';

describe('App', () => {
  test('the title is visible', () => {
    render(<App />);
    // @ts-expect-error
    expect(screen.getByText(/Reacdle/i)).toBeInTheDocument();
  });

  test('shows empty state', () => {
    useStore.setState({ answer: '', rows: [] });
    render(<App />);

    expect(screen.queryByText('Game Over')).toBeNull();
    expect(document.querySelectorAll('main div')).toHaveLength(6);
    expect(document.querySelector('main')?.textContent).toEqual('');
  });

  test('shows one row of guesses', () => {
    useStore.setState({ rows: [{ guess: 'hello' }] });
    render(<App />);
    expect(document.querySelector('main')?.textContent).toEqual('hello');
  });

  test('shows game over state', () => {
    useStore.setState({ rows: Array(6).fill('hello') });
    render(<App />);
    // expect(document.querySelector('main')?.textContent).toEqual('hello');

    // @ts-expect-error
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });

  test('new game button starts a new game', () => {
    useStore.setState({ rows: Array(6).fill('hello') });
    render(<App />);
    // expect(document.querySelector('main')?.textContent).toEqual('hello');

    // @ts-expect-error
    expect(screen.getByText('Game Over!')).toBeInTheDocument();

    userEvent.click(screen.getByText('New Game'));
    expect(document.querySelector('main')?.textContent).toEqual('');
  });
});
