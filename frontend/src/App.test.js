import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
describe('',() => {


test('should render app component', () => {
  render(<App />);
  const appElement = screen.findAllByRole('heading')
  expect(appElement).toBeInTheDocument();
});
})