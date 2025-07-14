import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchInput } from '../SearchInput';


describe('SearchInput', () => {
  it('should render input and allow typing', () => {
    render(
      <BrowserRouter>
        <SearchInput />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search by name/i);
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'john' } });
    expect((input as HTMLInputElement).value).toBe('john');
  });
});
