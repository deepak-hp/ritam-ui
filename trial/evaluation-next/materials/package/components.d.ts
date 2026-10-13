import { type ReactNode, type ComponentProps } from 'react';
type NativeButtonProps = Omit<ComponentProps<'button'>, 'color'>;
export type ButtonProps = NativeButtonProps & {
    variant?: 'primary' | 'secondary' | 'quiet';
    loading?: boolean;
};
export declare function Button({ variant, loading, disabled, children, className, ...props }: ButtonProps): import("react").JSX.Element;
export type TextFieldProps = Omit<ComponentProps<'input'>, 'size'> & {
    label: string;
    description?: string;
    error?: string;
};
export declare function TextField({ label, description, error, id: givenId, ...props }: TextFieldProps): import("react").JSX.Element;
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type SelectProps = {
    label: string;
    value: string | null;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    disabled?: boolean;
    name?: string;
    placeholder?: string;
    description?: string;
    error?: string;
};
export declare function Select({ label, value, onValueChange, options, disabled, name, placeholder, description, error }: SelectProps): import("react").JSX.Element;
export type DialogProps = {
    triggerLabel: string;
    title: string;
    description: string;
    children: ReactNode;
    confirmLabel?: string;
    onConfirm?: () => void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};
export declare function Dialog({ triggerLabel, title, description, children, confirmLabel, onConfirm, open, defaultOpen, onOpenChange }: DialogProps): import("react").JSX.Element;
export {};
