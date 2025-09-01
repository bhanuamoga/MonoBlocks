import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../app/(auth)/sign-in/page'; // corrected import path

describe('Login Form (Strict Validation)', () => {
  it('renders all key input fields and controls', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/^Email$/)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  it('shows required errors for empty submit', async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/Please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your password/i)).toBeInTheDocument();
  });

  it('shows invalid email format error', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/^Email$/), { target: { value: 'notanemail' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
  });

  it('does not show error messages when valid input is provided', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText(/^Email$/), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/^Password$/), { target: { value: 'securePassword123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Please enter your email/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Please enter your password/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Invalid email address/i)).not.toBeInTheDocument();
    });
  });
});
