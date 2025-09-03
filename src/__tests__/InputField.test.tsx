import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InputField from '../components/InputField';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Eye: () => <div data-testid="eye-icon">Eye</div>,
  EyeOff: () => <div data-testid="eye-off-icon">EyeOff</div>,
  X: () => <div data-testid="x-icon">X</div>,
  Loader2: () => <div data-testid="loader-icon">Loader</div>,
}));

describe('InputField', () => {
  it('renders basic input field', () => {
    render(
      <InputField 
        label="Test Label" 
        placeholder="Test placeholder" 
      />
    );
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(
      <InputField 
        label="Test Label" 
        helperText="This is helper text" 
      />
    );
    
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('shows error message and applies error styles', () => {
    render(
      <InputField 
        label="Test Label" 
        errorMessage="This is an error" 
        invalid
      />
    );
    
    expect(screen.getByText('This is an error')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toHaveClass('text-destructive');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <InputField 
        label="Test Label" 
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'test value' } });
    
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'test value' })
      })
    );
  });

  it('shows clear button when clearable and has value', () => {
    render(
      <InputField 
        label="Test Label" 
        value="test value"
        clearable
      />
    );
    
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', () => {
    const handleClear = vi.fn();
    const handleChange = vi.fn();
    
    render(
      <InputField 
        label="Test Label" 
        value="test value"
        clearable
        onClear={handleClear}
        onChange={handleChange}
      />
    );
    
    const clearButton = screen.getByTestId('x-icon').closest('button');
    fireEvent.click(clearButton!);
    
    expect(handleClear).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' })
      })
    );
  });

  it('shows password toggle button when showPasswordToggle is true', () => {
    render(
      <InputField 
        label="Password" 
        showPasswordToggle
      />
    );
    
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
  });

  it('toggles password visibility when toggle button is clicked', () => {
    render(
      <InputField 
        label="Password" 
        showPasswordToggle
        value="password"
      />
    );
    
    const input = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByTestId('eye-icon').closest('button');
    
    // Initially password type
    expect(input.type).toBe('password');
    
    // Click to show password
    fireEvent.click(toggleButton!);
    expect(input.type).toBe('text');
    expect(screen.getByTestId('eye-off-icon')).toBeInTheDocument();
    
    // Click to hide password
    fireEvent.click(toggleButton!);
    expect(input.type).toBe('password');
    expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
  });

  it('shows loading spinner when loading is true', () => {
    render(
      <InputField 
        label="Test Label" 
        loading
      />
    );
    
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });

  it('disables input when disabled is true', () => {
    render(
      <InputField 
        label="Test Label" 
        disabled
      />
    );
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <InputField 
        label="Test Label" 
        size="sm"
      />
    );
    
    let input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('h-8');
    
    rerender(
      <InputField 
        label="Test Label" 
        size="lg"
      />
    );
    
    input = screen.getByLabelText('Test Label');
    expect(input).toHaveClass('h-12');
  });
});