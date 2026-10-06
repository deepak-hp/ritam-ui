import { type ReactNode } from 'react';
export type TableSort = {
    key: string;
    direction: 'asc' | 'desc';
} | null;
export type DataTableColumn<Row> = {
    key: string;
    header: string;
    cell: (row: Row) => ReactNode;
    sortValue?: (row: Row) => string | number | null | undefined;
};
export type DataTableProps<Row> = {
    caption: string;
    rows: Row[];
    columns: DataTableColumn<Row>[];
    rowKey: (row: Row) => string;
    /** Omit to let the table manage its sort; pass null for a controlled unsorted table. */
    sort?: TableSort;
    onSortChange?: (sort: TableSort) => void;
    loading?: boolean;
    emptyMessage?: string;
};
/** Semantic client-side table. Compose Pagination externally; no virtualization or server query is implied. */
export declare function DataTable<Row>({ caption, rows, columns, rowKey, sort: controlledSort, onSortChange, loading, emptyMessage }: DataTableProps<Row>): import("react").JSX.Element;
