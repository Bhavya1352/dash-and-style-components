import React, { useState } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  loading?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  showPasswordToggle?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  loading = false,
  clearable = false,
  onClear,
  showPasswordToggle = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg',
  };

  const variantClasses = {
    outlined: `border-2 bg-transparent ${
      invalid 
        ? 'border-red-500 focus:border-red-500' 
        : isFocused 
        ? 'border-blue-500' 
        : 'border-gray-300 dark:border-gray-600'
    }`,
    filled: `border-0 ${
      invalid 
        ? 'bg-red-50 dark:bg-red-900/20' 
        : 'bg-gray-100 dark:bg-gray-800'
    }`,
    ghost: `border-0 bg-transparent ${
      invalid 
        ? 'border-b-2 border-red-500' 
        : isFocused 
        ? 'border-b-2 border-blue-500' 
        : 'border-b border-gray-300 dark:border-gray-600'
    }`,
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className={`block text-sm font-medium mb-2 ${
          invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
        }`}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full rounded-lg transition-all duration-200 outline-none
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 dark:hover:border-gray-500'}
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            ${showPasswordToggle || clearable || loading ? 'pr-12' : ''}
          `}
          aria-invalid={invalid}
          aria-describedby={helperText || errorMessage ? `${label}-help` : undefined}
        />
        
        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        )}
        
        {/* Clear button */}
        {clearable && value && !loading && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Clear input"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        
        {/* Password toggle */}
        {showPasswordToggle && !loading && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || errorMessage) && (
        <p
          id={`${label}-help`}
          className={`mt-2 text-sm ${
            invalid ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {invalid ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;