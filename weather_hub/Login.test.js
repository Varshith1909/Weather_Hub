import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);

    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    const token = 'mockedToken';
    axios.post.mockResolvedValueOnce({ data: { token } });
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/login', {
        username: 'testuser',
        password: 'testpassword',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('jwtToken', token);
      expect(console.log).toHaveBeenCalledWith('Logged in successfully!!!');
    });
  });

  test('handles login error', async () => {
    const errorMessage = 'Invalid credentials';
    axios.post.mockRejectedValueOnce({ response: { data: errorMessage } });
    const { getByPlaceholderText, getByText } = render(<Login />);

    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/login', {
        username: 'testuser',
        password: 'testpassword',
      });
      expect(console.error).toHaveBeenCalledWith('Error logging in:', errorMessage);
    });
  });

  test('checks user login status on mount', () => {
    const getItemMock = jest.spyOn(localStorage, 'getItem');
    getItemMock.mockReturnValueOnce('mockedToken');

    render(<Login />);

    expect(console.log).toHaveBeenCalledWith('User is logged in');
  });
});
