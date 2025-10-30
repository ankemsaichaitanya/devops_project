import { render, screen } from '@testing-library/react';
import App from './App';

// ✅ Basic test to check if title renders
test('renders Weather App heading', () => {
    render(<App />);
    const titleElement = screen.getByText(/Weather App/i);
    expect(titleElement).toBeInTheDocument();
});
