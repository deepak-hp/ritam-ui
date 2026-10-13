import { type ComponentProps } from 'react';
type FieldMessagesProps = {
    description?: string;
    error?: string;
};
export type TextareaProps = Omit<ComponentProps<'textarea'>, 'size'> & FieldMessagesProps & {
    label: string;
};
export declare function Textarea({ label, description, error, id: suppliedId, className, ...props }: TextareaProps): import("react").JSX.Element;
export type NumberFieldProps = FieldMessagesProps & {
    label: string;
    value: number | null;
    onValueChange: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number | 'any';
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
};
export declare function NumberField({ label, value, onValueChange, description, error, id: suppliedId, disabled, ...props }: NumberFieldProps): import("react").JSX.Element;
export type SliderProps = FieldMessagesProps & {
    label: string;
    value: number;
    onValueChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    id?: string;
};
export declare function Slider({ label, value, onValueChange, description, error, disabled, ...props }: SliderProps): import("react").JSX.Element;
export type ComboboxOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type ComboboxProps = FieldMessagesProps & {
    label: string;
    value: string | null;
    onValueChange: (value: string | null) => void;
    options: ComboboxOption[];
    disabled?: boolean;
    name?: string;
    id?: string;
    placeholder?: string;
};
export declare function Combobox({ label, value, onValueChange, options, description, error, disabled, id: suppliedId, placeholder, ...props }: ComboboxProps): import("react").JSX.Element;
export type ToggleGroupOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type ToggleGroupProps = FieldMessagesProps & {
    label: string;
    value: string[];
    onValueChange: (value: string[]) => void;
    options: ToggleGroupOption[];
    disabled?: boolean;
    multiple?: boolean;
    orientation?: 'horizontal' | 'vertical';
    id?: string;
};
export declare function ToggleGroup({ label, value, onValueChange, options, description, error, disabled, multiple, orientation, id: suppliedId }: ToggleGroupProps): import("react").JSX.Element;
export type DateFieldProps = Omit<ComponentProps<'input'>, 'type' | 'size' | 'value' | 'onChange'> & FieldMessagesProps & {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
};
export declare function DateField({ label, value, onValueChange, description, error, id: suppliedId, className, ...props }: DateFieldProps): import("react").JSX.Element;
export type FileUploadProps = Omit<ComponentProps<'input'>, 'type' | 'size' | 'onChange' | 'value' | 'defaultValue'> & FieldMessagesProps & {
    label: string;
    onFilesChange?: (files: FileList | null) => void;
};
export declare function FileUpload({ label, onFilesChange, description, error, id: suppliedId, className, ...props }: FileUploadProps): import("react").JSX.Element;
export {};
