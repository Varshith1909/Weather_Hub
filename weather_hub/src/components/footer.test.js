import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer Component', () => {
  test('Renders the About Us section', () => {
    render(<Footer />);
    const aboutUsText = screen.getByText('About Us');
    expect(aboutUsText).toBeInTheDocument();
  });

  test('Renders the Contact Us section', () => {
    render(<Footer />);
    const contactUsText = screen.getByText('Contact Us');
    expect(contactUsText).toBeInTheDocument();
  });

  test('Renders the copyright notice', () => {
    render(<Footer />);
    const copyrightText = screen.getByText(`© ${new Date().getFullYear()} Weather Hub. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
  });
});