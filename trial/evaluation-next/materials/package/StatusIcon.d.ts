import type { SVGProps } from 'react';
export type AsyncVisualState = 'idle' | 'pending' | 'success' | 'error';
export type StatusIconKind = 'send' | 'payment' | 'loading';
export interface StatusIconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    state: AsyncVisualState;
    kind?: StatusIconKind;
    size?: number;
}
export declare function StatusIcon({ state, kind, size, className, ...props }: StatusIconProps): import("react").JSX.Element;
