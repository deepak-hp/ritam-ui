import { type ComponentProps, type ReactNode } from 'react';
export type FeedbackTone = 'neutral' | 'success' | 'error' | 'warning';
export type BadgeProps = {
    children: ReactNode;
    tone?: FeedbackTone;
};
export declare function Badge({ children, tone }: BadgeProps): import("react").JSX.Element;
export type AlertProps = {
    title: string;
    children?: ReactNode;
    tone?: FeedbackTone;
    live?: 'off' | 'polite' | 'assertive';
};
export declare function Alert({ title, children, tone, live }: AlertProps): import("react").JSX.Element;
export type AvatarProps = {
    name: string;
    src?: string;
    size?: number;
};
export declare function Avatar({ name, src, size }: AvatarProps): import("react").JSX.Element;
export type CardProps = ComponentProps<'div'>;
/** Noninteractive surface; compose links or buttons inside instead of nesting interactive cards. */
export declare function Card({ className, ...props }: CardProps): import("react").JSX.Element;
export type SeparatorProps = ComponentProps<'hr'>;
export declare function Separator({ className, ...props }: SeparatorProps): import("react").JSX.Element;
export type SkeletonProps = {
    width?: number | string;
    height?: number;
    label?: string;
};
export declare function Skeleton({ width, height, label }: SkeletonProps): import("react").JSX.Element;
export type ProgressProps = {
    label: string;
    value?: number;
    max?: number;
};
export declare function Progress({ label, value, max }: ProgressProps): import("react").JSX.Element;
export type SpinnerProps = {
    label: string;
};
export declare function Spinner({ label }: SpinnerProps): import("react").JSX.Element;
export type EmptyStateProps = {
    title: string;
    description: string;
    action?: ReactNode;
};
export declare function EmptyState({ title, description, action }: EmptyStateProps): import("react").JSX.Element;
export type ToastOptions = {
    title: string;
    description?: string;
    tone?: FeedbackTone;
    timeout?: number;
    priority?: 'low' | 'high';
};
export type ToastController = {
    add: (options: ToastOptions) => string;
    dismiss: (id?: string) => void;
    update: (id: string, options: Partial<ToastOptions>) => void;
};
/** Must be called beneath ToastProvider. Use timeout:0 for messages that require user acknowledgement. */
export declare function useToast(): ToastController;
export type ToastProviderProps = {
    children: ReactNode;
    timeout?: number;
    limit?: number;
};
export declare function ToastProvider({ children, timeout, limit }: ToastProviderProps): import("react").JSX.Element;
