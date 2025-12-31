import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    className,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageButtons = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push('ellipsis-start');
            }

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('ellipsis-end');
            }
            pages.push(totalPages);
        }

        return pages.map((page, index) => {
            if (typeof page === 'string') {
                return (
                    <div key={`${page}-${index}`} className="flex h-9 w-9 items-center justify-center text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                    </div>
                );
            }

            return (
                <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    className={cn(
                        "h-9 w-9 p-0 font-mono",
                        currentPage === page && "shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                    )}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </Button>
            );
        });
    };

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="gap-1 border-white/5 bg-[#121214] hover:bg-white/10"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-1">
                {renderPageButtons()}
            </div>

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="gap-1 border-white/5 bg-[#121214] hover:bg-white/10"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
