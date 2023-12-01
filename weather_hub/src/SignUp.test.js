import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignUp from './SignUp';
import axios from 'axios';

jest.mock('axios');

describe('SignUp component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the sign-up form correctly', () => {
    render(<SignUp />);
    
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('updates form fields correctly', () => {
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });

    expect(screen.getByPlaceholderText('Name')).toHaveValue('Test User');
    expect(screen.getByPlaceholderText('Email')).toHaveValue('test@example.com');
  });

  it('submits the form with user data', async () => {
    render(<SignUp />);

    axios.post.mockResolvedValueOnce({ data: { message: 'User registered successfully' } });

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser123' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/register', {
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser123',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(screen.getByText('User registered successfully')).toBeInTheDocument();
  });

  it('handles form submission error', async () => {
    render(<SignUp />);

    const errorMessage = 'Error signing up: Invalid email format';

    axios.post.mockRejectedValueOnce({ response: { data: errorMessage } });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/register', {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
