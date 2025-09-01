import React from 'react';
import { render, screen } from '@testing-library/react';
import SignInPage from '../app/(auth)/sign-in/page';

describe('Login Page Rendering', () => {
//   it('renders logo and app name', () => {
//     expect(render(<SignInPage />));
//     expect(screen.getByText(/Morr appz/i)).toBeInTheDocument();
//   });

  it('renders the main login heading', () => {
    render(<SignInPage />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  it('renders static explanation text', () => {
    render(<SignInPage />);
    expect(
      screen.getByText(/Enter your email and password below to log into your account/i)
    ).toBeInTheDocument();
  });

  it('renders the email input', () => {
    render(<SignInPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
  });

  it('renders the password input with label and type', () => {
    render(<SignInPage />);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('renders the Forgot Password link', () => {
    render(<SignInPage />);
    expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
  });

  it('renders the Login button', () => {
    render(<SignInPage />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('renders the Sign Up link', () => {
    render(<SignInPage />);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('renders the OR CONTINUE WITH divider', () => {
    render(<SignInPage />);
    expect(screen.getByText(/or continue with/i)).toBeInTheDocument();
  });

  it('renders third-party login buttons', () => {
    render(<SignInPage />);
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
  });

  it('renders the Terms of Service and Privacy Policy links', () => {
    render(<SignInPage />);
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });
});
