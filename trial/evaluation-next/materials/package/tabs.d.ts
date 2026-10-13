import type { ReactNode } from 'react';
export type TabsProps = {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    items: {
        value: string;
        label: string;
        content: ReactNode;
        disabled?: boolean;
    }[];
};
/** Controlled tabs. Hidden panels stay mounted to preserve form state. */
export declare function Tabs({ label, value, onValueChange, items }: TabsProps): import("react").JSX.Element;
