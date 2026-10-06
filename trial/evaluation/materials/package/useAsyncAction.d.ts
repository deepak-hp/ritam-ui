import type { AsyncVisualState } from './StatusIcon';
export interface AsyncActionController {
    state: AsyncVisualState;
    run: () => void;
    cancel: () => void;
    reset: () => void;
}
export declare function useAsyncAction(action: (signal: AbortSignal) => Promise<void>): AsyncActionController;
