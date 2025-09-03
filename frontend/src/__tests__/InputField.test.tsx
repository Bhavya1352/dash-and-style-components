import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../components/InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField 
        label="Email" 
        placeholder="Enter your email" 
      />
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(
      <InputField 
        value="test" 
        onChange={handleChange} 
        label="Test Input"
      />
    );
    
    const input = screen.getByDisplayValue('test');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message when invalid', () => {
    render(
      <InputField 
        label="Email"
        invalid
        errorMessage="Email is required"
      />
    );
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows helper text when provided', () => {
    render(
      <InputField 
        label="Password"
        helperText="Must be at least 8 characters"
      />
    );
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('disables input when disabled prop is true', () => {
    render(
      <InputField 
        label="Disabled Input"
        disabled
      />
    );
    
    expect(screen.getByLabelText('Disabled Input')).toBeDisabled();
  });

  it('shows clear button when clearable and has value', () => {
    const handleClear = vi.fn();
    render(
      <InputField 
        label="Search"
        value="test"
        clearable
        onClear={handleClear}
      />
    );
    
    const clearButton = screen.getByLabelText('Clear input');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalled();
  });

  it('shows password toggle when showPasswordToggle is true', () => {
    render(
      <InputField 
        label="Password"
        showPasswordToggle
      />
    );
    
    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    render(
      <InputField 
        label="Password"
        showPasswordToggle
      />
    );
    
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input.type).toBe('password');
    
    fireEvent.click(toggleButton);
    expect(input.type).toBe('text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <InputField 
        label="Test"
        variant="outlined"
      />
    );
    
    let input = screen.getByLabelText('Test');
    expect(input).toHaveClass('border-2');
    
    rerender(
      <InputField 
        label="Test"
        variant="filled"
      />
    );
    
    input = screen.getByLabelText('Test');
    expect(input).toHaveClass('border-0');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <InputField 
        label="Test"
        size="sm"
      />
    );
    
    let input = screen.getByLabelText('Test');
    expect(input).toHaveClass('px-3', 'py-2', 'text-sm');
    
    rerender(
      <InputField 
        label="Test"
        size="lg"
      />
    );
    
    input = screen.getByLabelText('Test');
    expect(input).toHaveClass('px-5', 'py-4', 'text-lg');
  });
});