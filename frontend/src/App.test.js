import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login text', () => {
  render(<App />);
  const signInText = screen.getByText(/Sign in/); 
  expect(signInText).toBeInTheDocument();
});
