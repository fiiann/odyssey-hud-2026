import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

export interface Column<T> {
    key: keyof T | string;
    header: string;
    renderCell?: (item: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyState?: React.ReactNode;
    sortConfig?: {
        key: string;
        direction: 'asc' | 'desc';
    };
    onSort?: (key: string) => void;
    className?: string;
    rowClassName?: string;
}

export function Table<T>({
    columns,
    data,
    isLoading,
    emptyState,
    sortConfig,
    onSort,
    className,
    rowClassName,
}: TableProps<T>) {
    return (
        <div className={cn("w-full overflow-auto rounded-xl border border-white/5 bg-[#121214] shadow-2xl", className)}>
            <table className="w-full text-left text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                        {columns.map((column) => (
                            <th
                                key={column.key as string}
                                className={cn(
                                    "p-4 font-bold uppercase tracking-widest text-[10px] text-muted-foreground",
                                    column.sortable && "cursor-pointer hover:text-foreground transition-colors",
                                    column.width
                                )}
                                onClick={() => column.sortable && onSort?.(column.key as string)}
                            >
                                <div className="flex items-center gap-2">
                                    {column.header}
                                    {column.sortable && (
                                        <div className="flex flex-col">
                                            {sortConfig?.key === column.key ? (
                                                sortConfig.direction === 'asc' ? (
                                                    <ChevronUp className="h-3 w-3 text-primary" />
                                                ) : (
                                                    <ChevronDown className="h-3 w-3 text-primary" />
                                                )
                                            ) : (
                                                <ChevronsUpDown className="h-3 w-3 opacity-30" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                            <tr key={i} className="animate-pulse">
                                {columns.map((_, j) => (
                                    <td key={j} className="p-4">
                                        <div className="h-4 w-full rounded bg-white/5" />
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="p-8 text-center">
                                {emptyState || (
                                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                        <p className="font-medium">No results found</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ) : (
                        data.map((item, i) => (
                            <tr
                                key={i}
                                className={cn(
                                    "group transition-colors hover:bg-white/[0.02]",
                                    rowClassName
                                )}
                            >
                                {columns.map((column) => (
                                    <td key={column.key as string} className="p-4 leading-relaxed">
                                        {column.renderCell
                                            ? column.renderCell(item)
                                            : (item[column.key as keyof T] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
