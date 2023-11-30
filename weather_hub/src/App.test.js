import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  it('renders Navbar and Footer components', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders Home component for the default and "/forecast" route', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument(); // Assuming "Welcome to Home Page" text is present in Home component
  });

  it('renders Login component for the "/login" route', () => {
    render(
      <Router initialEntries={['/login']}>
        <App />
      </Router>
    );

    expect(screen.getByText('Login')).toBeInTheDocument(); // Assuming "Login" text is present in Login component
  });

  it('renders SignUp component for the "/signup" route', () => {
    render(
      <Router initialEntries={['/signup']}>
        <App />
      </Router>
    );

    expect(screen.getByText('Sign Up')).toBeInTheDocument(); // Assuming "Sign Up" text is present in SignUp component
  });

  it('redirects to Home component for unknown routes', () => {
    render(
      <Router initialEntries={['/unknown']}>
        <App />
      </Router>
    );

    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument(); // Assuming redirection to Home component for unknown routes
  });
});
