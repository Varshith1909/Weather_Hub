import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('renders input field for city search', () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText('Search for a city here');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates search input value on change', () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText('Search for a city here');
    fireEvent.change(inputElement, { target: { value: 'New York' } });

    expect(inputElement).toHaveValue('New York');
  });

  // Mocking fetch calls for getCityData function
  const mockCityData = {
    name: 'Portland',
    main: { temp: 290 },
    sys: { sunrise: 1638544800, sunset: 1638584400 },
    timezone: -25200,
    wind: { speed: 3.5 },
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockCityData),
    })
  );

  it('displays city name and current temperature on successful search', async () => {
    render(<Home />);

    const inputElement = screen.getByPlaceholderText('Search for a city here');
    fireEvent.change(inputElement, { target: { value: 'Portland' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    await act(async () => {
      const cityName = await screen.findByText('Portland');
      const currentTemp = await screen.findByText('17 °C'); // Assuming the temperature conversion logic remains the same
      expect(cityName).toBeInTheDocument();
      expect(currentTemp).toBeInTheDocument();
    });
  });

  it('handles error on failed city search', async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Error fetching weather data')));

    render(<Home />);

    const inputElement = screen.getByPlaceholderText('Search for a city here');
    fireEvent.change(inputElement, { target: { value: 'InvalidCity' } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    const errorAlert = await screen.findByText('ERROR: Error fetching weather data');
    expect(errorAlert).toBeInTheDocument();
  });
});
