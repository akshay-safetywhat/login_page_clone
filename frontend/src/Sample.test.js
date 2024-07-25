import { render, screen, cleanup } from '@testing-library/react';
import Sample from './Sample';
import { MemoryRouter

  
 } from 'react-router-dom';
describe('', () => {
test('should render app component', () => {
  render(<Sample />);
  const appElement = screen.getByTestId('todo-1');
  expect(appElement).toBeInTheDocument();
  expect(appElement).get('Hi'):
})
})