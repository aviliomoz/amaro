import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage = 1, totalPages, onPageChange }: Props) => {
    return (
        <div className="flex justify-center m-4">
            <nav className="flex items-center space-x-2">
                <button
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="size-4" />
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="size-4" />
                </button>
            </nav>
        </div>
    );
}