
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';


jest.mock('../../hooks/useUsers', () => ({
  useUsers: jest.fn(),
}));



describe('Home Component', () => {
  const queryClient = new QueryClient();
  const mockUseUsers = jest.requireMock('../../hooks/useUsers').useUsers;

  describe('Normal State', () => {
    beforeEach(() => {
     
      // Mock the useUsers hook to return a list of users
      mockUseUsers.mockReturnValue({
        data: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            company: {
              name: 'Example Corp'
            },
            role: 'admin'
          }
        ],
        isLoading: false,
      });

      // Render the Home component with the QueryClientProvider and BrowserRouter
      render(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </QueryClientProvider>
      );
    });

    it('should render the dashboard title', () => {
      // Check if the dashboard title is rendered
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
    });

    it('should render user data with all fields', () => {
      // Check if all user data fields are rendered
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
      expect(screen.getByText('123-456-7890')).toBeInTheDocument();
      expect(screen.getByText('Example Corp')).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading indicator', () => {
      // Override the mock to return isLoading: true
      mockUseUsers.mockReturnValue({
        data: [],
        isLoading: true,
      });
    
      render(
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        </QueryClientProvider>
      );
      
      // تغییر این خط
      expect(screen.getByText('Loading user data...')).toBeInTheDocument();
    });
  });
});