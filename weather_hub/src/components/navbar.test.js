import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(<Navbar />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('renders correct links in Navbar', () => {
    render(<Navbar />);
    const homeLink = screen.getByText(/Weather-Home/i);
    const forecastLink = screen.getByText(/Forecast/i);
    const loginLink = screen.getByText(/Login\/Signup/i);

    expect(homeLink).toBeInTheDocument();
    expect(forecastLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  test('links have correct href attributes', () => {
    render(<Navbar />);
    const homeLink = screen.getByText(/Weather-Home/i);
    const forecastLink = screen.getByText(/Forecast/i);
    const loginLink = screen.getByText(/Login\/Signup/i);

    expect(homeLink.getAttribute('href')).toBe('/');
    expect(forecastLink.getAttribute('href')).toBe('/forecast');
    expect(loginLink.getAttribute('href')).toBe('/login');
  });
});
