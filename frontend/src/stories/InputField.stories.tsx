import type { Meta, StoryObj } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import InputField from '../components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and additional features like password toggle and clear button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input is in an invalid state',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show clear button when input has value',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show password visibility toggle',
    },
  },
  args: {
    // onChange: action('onChange'),
    // onClear: action('onClear'),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We never share your email with anyone else.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InputField
        label="Outlined (Default)"
        placeholder="Enter text..."
        variant="outlined"
      />
      <InputField
        label="Filled"
        placeholder="Enter text..."
        variant="filled"
      />
      <InputField
        label="Ghost"
        placeholder="Enter text..."
        variant="ghost"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InputField
        label="Small"
        placeholder="Small input"
        size="sm"
      />
      <InputField
        label="Medium (Default)"
        placeholder="Medium input"
        size="md"
      />
      <InputField
        label="Large"
        placeholder="Large input"
        size="lg"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InputField
        label="Normal State"
        placeholder="Enter text..."
        helperText="This is helper text"
      />
      <InputField
        label="Disabled State"
        placeholder="Disabled input"
        disabled
        helperText="This input is disabled"
      />
      <InputField
        label="Error State"
        placeholder="Enter valid data"
        invalid
        errorMessage="This field is required"
      />
      <InputField
        label="Loading State"
        placeholder="Loading..."
        loading
        helperText="Processing your request"
      />
    </div>
  ),
};

export const Features: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <InputField
        label="With Clear Button"
        placeholder="Type something..."
        clearable
        defaultValue="Clear me!"
      />
      <InputField
        label="Password Input"
        placeholder="Enter password"
        showPasswordToggle
        defaultValue="secretpassword"
      />
      <InputField
        label="Search Input"
        placeholder="Search..."
        clearable
        loading
        defaultValue="Searching..."
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    invalid: true,
    errorMessage: 'Username must be at least 3 characters long',
    defaultValue: 'ab',
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    defaultValue: 'mysecretpassword',
  },
};