import { type ReactElement, type ReactNode } from 'react';
export type TooltipProps = {
    content: ReactNode;
    children: ReactElement;
    disabled?: boolean;
};
export declare function Tooltip({ content, children, disabled }: TooltipProps): import("react").JSX.Element;
export type OverlayOpenProps = {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};
export type PopoverProps = {
    triggerLabel: string;
    title: string;
    children: ReactNode;
} & OverlayOpenProps;
export declare function Popover({ triggerLabel, title, children, open, defaultOpen, onOpenChange }: PopoverProps): import("react").JSX.Element;
export type DropdownMenuItem = {
    label: string;
    onSelect?: () => void;
    disabled?: boolean;
};
export type DropdownMenuProps = {
    triggerLabel: string;
    items: DropdownMenuItem[];
} & OverlayOpenProps;
export declare function DropdownMenu({ triggerLabel, items, open, defaultOpen, onOpenChange }: DropdownMenuProps): import("react").JSX.Element;
export type AlertDialogProps = {
    triggerLabel: string;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
    onConfirm: () => void;
    children?: ReactNode;
} & OverlayOpenProps;
export declare function AlertDialog({ triggerLabel, title, description, confirmLabel, cancelLabel, onConfirm, children, open, defaultOpen, onOpenChange }: AlertDialogProps): import("react").JSX.Element;
export type DrawerProps = {
    triggerLabel: string;
    title: string;
    description?: string;
    children: ReactNode;
    side?: 'left' | 'right';
} & OverlayOpenProps;
export declare function Drawer({ triggerLabel, title, description, children, side, open, defaultOpen, onOpenChange }: DrawerProps): import("react").JSX.Element;
export type AccordionItem = {
    value: string;
    label: string;
    content: ReactNode;
    disabled?: boolean;
};
export type AccordionProps = {
    label: string;
    items: AccordionItem[];
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    multiple?: boolean;
};
export declare function Accordion({ label, items, value, defaultValue, onValueChange, multiple }: AccordionProps): import("react").JSX.Element;
