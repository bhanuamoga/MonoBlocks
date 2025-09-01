import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpPage from '../app/(auth)/sign-up/page';

describe('Signup Form (Strict Validation)', () => {

  it('renders all input fields', () => {
    render(<SignUpPage />);
    expect(screen.getByLabelText(/^First Name$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Last Name$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Username$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Mobile$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm Password$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Business Name$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Business Number$/)).toBeInTheDocument();
  });

  it('shows correct error messages for all required fields (empty submit)', async () => {
    render(<SignUpPage />);
    fireEvent.click(screen.getByRole('button', { name: /^Create Account$/ }));

    expect(await screen.findByText(/^First name is required$/)).toBeInTheDocument();
    expect(screen.getByText(/^Last name is required$/)).toBeInTheDocument();
    expect(screen.getByText(/^Please enter your email$/)).toBeInTheDocument();
    expect(screen.getByText(/^Please enter your username$/)).toBeInTheDocument();
    expect(screen.getByText(/^Mobile number is required$/)).toBeInTheDocument();
    expect(screen.getByText(/^Please enter your password$/)).toBeInTheDocument();
    expect(screen.getByText(/^Business name is required$/)).toBeInTheDocument();
    expect(screen.getByText(/^Business number is required$/)).toBeInTheDocument();
  });

  it('shows strictly correct error message for invalid email and password', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/^Email$/), { target: { value: 'notanemail' } });
    fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: 'foo' } });
    fireEvent.click(screen.getByRole('button', { name: /^Create Account$/ }));

    expect(await screen.findByText(/^Invalid email address$/)).toBeInTheDocument();
    expect(screen.getByText(/^Password must be at least 7 characters long$/)).toBeInTheDocument();
  });

  it('shows strictly correct error message for username, mobile, confirm password, and business number invalidations', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/^Username$/), { target: { value: 'a' } });
    fireEvent.change(screen.getByLabelText(/^Mobile$/), { target: { value: 'textnotphone' } });
    fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: 'password1' } });
    fireEvent.change(screen.getByLabelText(/^Confirm Password$/), { target: { value: 'notmatching' } });
    fireEvent.change(screen.getByLabelText(/^Business Number$/), { target: { value: 'letters' } });

    fireEvent.click(screen.getByRole('button', { name: /^Create Account$/ }));

    expect(await screen.findByText(/^Username must be at least 5 characters long$/)).toBeInTheDocument();
    expect(screen.getByText(/^Invalid mobile number format$/)).toBeInTheDocument();
    expect(screen.getByText(/^Passwords don't match\.$/)).toBeInTheDocument();
    expect(screen.getByText(/^Business number must be numeric$/)).toBeInTheDocument();
  });

  it('submits successfully with valid data (no error messages shown)', async () => {
    render(<SignUpPage />);
    // Fill valid values for all fields
    fireEvent.change(screen.getByLabelText(/^First Name$/), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/^Last Name$/), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/^Email$/), { target: { value: 'Girish312@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/^Username$/), { target: { value: 'johnny5' } });
    fireEvent.change(screen.getByLabelText(/^Mobile$/), { target: { value: '+12345678901' } });
    fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: 'strongPass1' } });
    fireEvent.change(screen.getByLabelText(/^Confirm Password$/), { target: { value: 'strongPass1' } });
    fireEvent.change(screen.getByLabelText(/^Business Name$/), { target: { value: 'Tech Co.' } });
    fireEvent.change(screen.getByLabelText(/^Business Number$/), { target: { value: '987654321' } });

    fireEvent.click(screen.getByRole('button', { name: /^Create Account$/ }));

    // Wait for error messages to NOT appear (strict absence)
    await waitFor(() => {
      expect(screen.queryByText(/^is required$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Please enter your email$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Password must be at least 7 characters long$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Passwords don't match\.$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Business number must be numeric$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Invalid mobile number format$/)).not.toBeInTheDocument();
      expect(screen.queryByText(/^Username must be at least 5 characters long$/)).not.toBeInTheDocument();
    });
  });

   it('shows only relevant password validation message if password is too short', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: 'ab' } });
    fireEvent.click(screen.getByRole('button', { name: /^Create Account$/ }));

    expect(await screen.findByText(/^Password must be at least 7 characters long$/)).toBeInTheDocument();
  });
});
