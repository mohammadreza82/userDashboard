import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { MemoryRouter } from 'react-router-dom';


// Mock the react-icons module
jest.mock('react-icons/fi', () => ({
  FiChevronLeft: () => <span>PreviousIcon</span>,
  FiChevronRight: () => <span>NextIcon</span>,
}));

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter initialEntries={['/items?page=2']}>{children}</MemoryRouter>
);

describe('Pagination component', () => {
  it('renders pagination buttons correctly', () => {
    render(<Pagination totalItems={30} itemsPerPage={10} />, { wrapper: Wrapper });

    // Check if page numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Check if navigation icons are rendered (using our mock)
    expect(screen.getByText('PreviousIcon')).toBeInTheDocument();
    expect(screen.getByText('NextIcon')).toBeInTheDocument();
  });

  it('disables Previous on first page', () => {
    const FirstPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <MemoryRouter initialEntries={['/items?page=1']}>{children}</MemoryRouter>
    );

    render(<Pagination totalItems={30} itemsPerPage={10} />, { wrapper: FirstPageWrapper });

    // Get the previous button by its role and aria-label
    const prevButton = screen.getByRole('button', { name: /previous/i });
    expect(prevButton).toBeDisabled();
  });

  it('disables Next on last page', () => {
    const LastPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <MemoryRouter initialEntries={['/items?page=3']}>{children}</MemoryRouter>
    );

    render(<Pagination totalItems={30} itemsPerPage={10} />, { wrapper: LastPageWrapper });

    // Get the next button by its role and aria-label
    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeDisabled();
  });
});