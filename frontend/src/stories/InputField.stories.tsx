import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from '../components';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
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
    <div className="space-y-4 w-80">
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
    <div className="space-y-4 w-80">
      <InputField
        label="Normal"
        placeholder="Normal state"
      />
      <InputField
        label="Disabled"
        placeholder="Disabled state"
        disabled
      />
      <InputField
        label="Loading"
        placeholder="Loading state"
        loading
      />
      <InputField
        label="Error"
        placeholder="Error state"
        invalid
        errorMessage="This field is required"
      />
    </div>
  ),
};

export const WithFeatures: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Clearable"
        placeholder="Type something..."
        clearable
        onClear={() => console.log('Cleared')}
      />
      <InputField
        label="Password"
        placeholder="Enter password"
        showPasswordToggle
      />
      <InputField
        label="Email with validation"
        type="email"
        placeholder="user@example.com"
        helperText="Enter a valid email address"
      />
    </div>
  ),
};