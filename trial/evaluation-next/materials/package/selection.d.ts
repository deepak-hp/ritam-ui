type SelectionProps = {
    label: string;
    description?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    name?: string;
};
export type CheckboxProps = SelectionProps & {
    indeterminate?: boolean;
};
export declare function Checkbox({ label, description, checked, onCheckedChange, disabled, name, indeterminate }: CheckboxProps): import("react").JSX.Element;
export type SwitchProps = SelectionProps;
export declare function Switch({ label, description, checked, onCheckedChange, disabled, name }: SwitchProps): import("react").JSX.Element;
export type RadioOption = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
};
export type RadioGroupProps = {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: RadioOption[];
    disabled?: boolean;
    name?: string;
};
export declare function RadioGroup({ label, value, onValueChange, options, disabled, name }: RadioGroupProps): import("react").JSX.Element;
export {};
