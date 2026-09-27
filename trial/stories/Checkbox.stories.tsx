import { useEffect, useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Checkbox } from '../src/index';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Product updates', description: 'A short weekly digest.', checked: false, onCheckedChange: () => {}, disabled: false, indeterminate: false },
  argTypes: { label: { control: 'text' }, description: { control: 'text' }, checked: { control: 'boolean' }, indeterminate: { control: 'boolean' }, disabled: { control: 'boolean' }, onCheckedChange: { action: 'changed' } },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: args => <ControlledCheckbox {...args} /> };
export const Indeterminate: Story = { args: { indeterminate: true, checked: false }, render: args => <ControlledCheckbox {...args} /> };
export const Disabled: Story = { args: { disabled: true, checked: true } };
export const KeyboardToggle: Story = {
  render: args => <ControlledCheckbox {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Product updates' });
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
  },
};

function ControlledCheckbox(props: ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(props.checked);
  const [indeterminate, setIndeterminate] = useState(props.indeterminate);
  useEffect(() => setChecked(props.checked), [props.checked]);
  useEffect(() => setIndeterminate(props.indeterminate), [props.indeterminate]);
  const handleCheckedChange = (next: boolean) => {
    setChecked(next);
    setIndeterminate(false);
    props.onCheckedChange(next);
  };
  return <Checkbox {...props} checked={checked} indeterminate={indeterminate} onCheckedChange={handleCheckedChange} />;
}
