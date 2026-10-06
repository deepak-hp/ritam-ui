import type { ComponentProps, ReactNode } from 'react';
import { type ButtonProps } from './components';
export type LinkProps = ComponentProps<'a'> & {
    href: string;
};
/** Uses a native anchor so routing, modifier clicks and downloads retain browser behaviour. */
export declare function Link({ className, target, rel, ...props }: LinkProps): import("react").JSX.Element;
export type IconButtonProps = Omit<ButtonProps, 'children' | 'aria-label' | 'aria-labelledby'> & {
    label: string;
    children: ReactNode;
};
export declare function IconButton({ label, children, className, variant, ...props }: IconButtonProps): import("react").JSX.Element;
export type BreadcrumbsProps = {
    label?: string;
    items: {
        label: string;
        href?: string;
    }[];
};
export declare function Breadcrumbs({ label, items }: BreadcrumbsProps): import("react").JSX.Element;
export type PaginationProps = {
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    label?: string;
    disabled?: boolean;
};
export declare function Pagination({ page, pageCount, onPageChange, label, disabled }: PaginationProps): import("react").JSX.Element;
