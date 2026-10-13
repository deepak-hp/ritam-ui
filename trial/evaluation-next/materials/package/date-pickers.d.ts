import { type CalendarProps, type DateRangeValue } from './calendar';
export type { DateRangeValue } from './calendar';
type PickerMessages = {
    description?: string;
    error?: string;
    name?: string;
    placeholder?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    id?: string;
};
export type DatePickerProps = CalendarProps & PickerMessages;
export type DateRangePickerProps = Omit<CalendarProps, 'value' | 'onValueChange'> & Omit<PickerMessages, 'name'> & {
    value: DateRangeValue;
    onValueChange: (value: DateRangeValue) => void;
    startName?: string;
    endName?: string;
};
export declare function DatePicker({ label, value, onValueChange, description, error, name, placeholder, open, defaultOpen, onOpenChange, id: suppliedId, disabled, ...calendar }: DatePickerProps): import("react").JSX.Element;
export declare function DateRangePicker({ label, value, onValueChange, description, error, startName, endName, placeholder, open, defaultOpen, onOpenChange, id: suppliedId, disabled, ...calendar }: DateRangePickerProps): import("react").JSX.Element;
