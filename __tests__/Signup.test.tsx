import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpPage from '../app/(auth)/sign-up/page';

describe('Signup Page Rendering', () => {
//   it('renders logo and app name', () => {
//     render(<SignUpPage />);
//     expect(screen.getByText(/Morr appz/i)).toBeInTheDocument();
//   });

  it('shows heading and explanation', () => {
    render(<SignUpPage />);
    expect(screen.getByRole('heading', { name: /Create an account/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Enter your email and password to create an account\./i)
    ).toBeInTheDocument();
  });

  it('renders account prompt and Sign In link separately', () => {
    render(<SignUpPage />);
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument();
    const signInLink = screen.getByRole('link', { name: /Sign In/i });
    expect(signInLink).toBeInTheDocument();
  });

  it('renders all signup form fields with labels', () => {
    render(<SignUpPage />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Number/i)).toBeInTheDocument();
  });

  it('renders all input placeholders', () => {
    render(<SignUpPage />);
    expect(screen.getByPlaceholderText("John")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Doe")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("+1234567890")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Business Inc.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("1234567890")).toBeInTheDocument();
  });

  it('renders password fields as type password', () => {
    render(<SignUpPage />);
    expect(screen.getByLabelText(/^Password$/i)).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText(/Confirm Password/i)).toHaveAttribute('type', 'password');
  });

  it('renders the Create Account button', () => {
    render(<SignUpPage />);
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  it('renders social login section and buttons', () => {
    render(<SignUpPage />);
    expect(screen.getByText(/or continue with/i)).toBeInTheDocument();
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument();
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
  });

  it('renders Terms of Service and Privacy Policy links', () => {
    render(<SignUpPage />);
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });
});
