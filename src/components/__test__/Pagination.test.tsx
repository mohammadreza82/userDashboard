import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { MemoryRouter } from 'react-router-dom';


// Define a wrapper component that uses MemoryRouter to set the initialEntries prop to ['/items?page=2']
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter initialEntries={['/items?page=2']}>{children}</MemoryRouter>
);

// Describe the Pagination component
describe('Pagination component', () => {
  // Test that the pagination buttons are rendered correctly
  it('renders pagination buttons correctly', () => {
    // Render the Pagination component with the Wrapper component
    render(<Pagination totalItems={30} itemsPerPage={10} />, { wrapper: Wrapper });

    // Expect the 'Previous' button to be in the document
    expect(screen.getByText('Previous')).toBeInTheDocument();
    // Expect the 'Next' button to be in the document
    expect(screen.getByText('Next')).toBeInTheDocument();
    // Expect the '1' button to be in the document
    expect(screen.getByText('1')).toBeInTheDocument();
    // Expect the '2' button to be in the document
    expect(screen.getByText('2')).toBeInTheDocument();
    // Expect the '3' button to be in the document
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  // Test that the 'Previous' button is disabled on the first page
  it('disables Previous on first page', () => {
    // Define a wrapper component that uses MemoryRouter to set the initialEntries prop to ['/items?page=1']
    const FirstPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <MemoryRouter initialEntries={['/items?page=1']}>{children}</MemoryRouter>
    );

    // Render the Pagination component with the FirstPageWrapper component
    render(<Pagination totalItems={30} itemsPerPage={10} />, { wrapper: FirstPageWrapper });

    // Expect the 'Previous' button to be disabled
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  // Test that the 'Next' button is disabled on the last page
  it('disables Next on last page', () => {
    // Define a wrapper component that uses MemoryRouter to set the initialEntries prop to ['/items?page=3']
    const LastPageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <MemoryRouter initialEntries={['/items?page=3']}>{children}</MemoryRouter>
    );

    // Render the Pagination component with the LastPageWrapper component
    render(<Pagination totalItems={30} itemsPerPage={10} />, { wrapper: LastPageWrapper });

 
    // Get all 'Next' buttons
    const nextButtons = screen.getAllByText('Next');

    // Expect at least one 'Next' button to be disabled
    expect(nextButtons.some(btn => (btn as HTMLButtonElement).disabled)).toBe(true);
  });
});
