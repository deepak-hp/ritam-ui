export type MultiSelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type MultiSelectProps = {
    label: string;
    value: string[];
    onValueChange: (value: string[]) => void;
    options: MultiSelectOption[];
    description?: string;
    error?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    placeholder?: string;
    emptyMessage?: string;
};
export declare function MultiSelect({ label, value, onValueChange, options, description, error, disabled, name, id: suppliedId, placeholder, emptyMessage }: MultiSelectProps): import("react").JSX.Element;
