import { TZDate } from '@daypicker/react';
export type CalendarProps = {
    label: string;
    value: string | null;
    onValueChange: (value: string | null) => void;
    defaultMonth?: string;
    min?: string;
    max?: string;
    disabledDates?: string[];
    disabled?: boolean;
    today?: string;
    autoFocus?: boolean;
};
export type CalendarRangeProps = Omit<CalendarProps, 'value' | 'onValueChange'> & {
    value: DateRangeValue;
    onValueChange: (value: DateRangeValue) => void;
};
export type DateRangeValue = {
    from: string | null;
    to: string | null;
};
export declare function parseISODate(value: string | null | undefined): TZDate | undefined;
export declare function formatISODate(date: Date | undefined): string | null;
export declare function Calendar({ label, value, onValueChange, defaultMonth, min, max, disabledDates, disabled, today, autoFocus }: CalendarProps): import("react").JSX.Element;
export declare function CalendarRange({ label, value, onValueChange, defaultMonth, min, max, disabledDates, disabled, today, autoFocus }: CalendarRangeProps): import("react").JSX.Element;
