import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  showPasswordToggle = false,
  onClear,
  type = 'text',
  className,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  const hasError = invalid || !!errorMessage;
  const hasValue = value && value.length > 0;

  // Size variants
  const sizeVariants = {
    sm: {
      container: 'text-sm',
      input: 'h-8 px-3 text-sm',
      label: 'text-xs',
      helper: 'text-xs'
    },
    md: {
      container: 'text-sm',
      input: 'h-10 px-3 text-sm',
      label: 'text-sm',
      helper: 'text-sm'
    },
    lg: {
      container: 'text-base',
      input: 'h-12 px-4 text-base',
      label: 'text-sm',
      helper: 'text-sm'
    }
  };

  // Variant styles
  const variantStyles = {
    filled: {
      container: cn(
        'bg-muted border border-transparent transition-all duration-200',
        isFocused && 'bg-background border-ring shadow-sm',
        hasError && 'border-destructive bg-destructive/5',
        disabled && 'opacity-60 cursor-not-allowed'
      ),
      input: 'bg-transparent border-0 focus:ring-0 placeholder:text-muted-foreground'
    },
    outlined: {
      container: cn(
        'bg-background border border-input transition-all duration-200',
        isFocused && 'border-ring shadow-sm',
        hasError && 'border-destructive',
        disabled && 'opacity-60 cursor-not-allowed bg-muted'
      ),
      input: 'bg-transparent border-0 focus:ring-0 placeholder:text-muted-foreground'
    },
    ghost: {
      container: cn(
        'bg-transparent border-0 border-b-2 border-input rounded-none transition-all duration-200',
        isFocused && 'border-ring',
        hasError && 'border-destructive',
        disabled && 'opacity-60 cursor-not-allowed'
      ),
      input: 'bg-transparent border-0 focus:ring-0 placeholder:text-muted-foreground rounded-none'
    }
  };

  const currentSize = sizeVariants[size];
  const currentVariant = variantStyles[variant];

  return (
    <div className={cn('space-y-2', currentSize.container, className)}>
      {label && (
        <label 
          className={cn(
            'block font-medium transition-colors',
            currentSize.label,
            hasError ? 'text-destructive' : 'text-foreground',
            disabled && 'opacity-60'
          )}
        >
          {label}
        </label>
      )}
      
      <div className={cn(
        'relative rounded-md',
        currentVariant.container
      )}>
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full transition-all duration-200 focus:outline-none',
            currentSize.input,
            currentVariant.input,
            (clearable && hasValue) || showPasswordToggle || loading ? 'pr-10' : '',
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        />
        
        {/* Action buttons container */}
        {((clearable && hasValue) || showPasswordToggle || loading) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
            
            {clearable && hasValue && !loading && (
              <button
                type="button"
                onClick={() => {
                  onClear?.();
                  onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
                }}
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {showPasswordToggle && !loading && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p className={cn(
          'transition-colors',
          currentSize.helper,
          hasError ? 'text-destructive' : 'text-muted-foreground'
        )}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;