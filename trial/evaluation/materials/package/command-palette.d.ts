export type CommandItem = {
    id: string;
    label: string;
    description?: string;
    keywords?: string[];
    disabled?: boolean;
    onSelect: () => void;
};
export type CommandPaletteProps = {
    triggerLabel?: string;
    title?: string;
    description?: string;
    items: CommandItem[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
};
export declare function CommandPalette({ triggerLabel, title, description, items, open, defaultOpen, onOpenChange, placeholder, emptyMessage, disabled, }: CommandPaletteProps): import("react").JSX.Element;
