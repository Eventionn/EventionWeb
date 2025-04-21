import { useState } from "react";

interface Order {
    id: number;
    user: {
        image: string;
        name: string;
        role: string;
    };
    projectName: string;
    status: string;
}

interface ApproveEventsTableProps {
    tableData: Order[];
}

export default function ApproveEventsCardView({ tableData }: ApproveEventsTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = tableData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl shadow overflow-hidden flex flex-col h-full"
                    >
                        <div className="w-full h-35 overflow-hidden">
                            <img
                                src={item.user.image}
                                alt={item.user.name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="p-4 flex flex-col justify-between flex-1 h-full">
                            <div className="text-start flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {item.user.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {item.user.role}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button className="flex-1 bg-red-500 text-white text-sm py-2 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition">
                                    Reject
                                </button>

                                <button className="flex-1 bg-blue-500 text-white text-sm py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition">
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação */}
            <div className="flex items-center justify-center gap-2 py-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded-md text-sm border disabled:opacity-50 text-theme-sm dark:text-gray-400"
                >
                    Back
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-3 py-1 rounded-md text-sm border ${currentPage === i + 1 ? "bg-gray-200 dark:bg-gray-700" : ""} text-theme-sm dark:text-gray-400`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded-md text-sm border disabled:opacity-50 text-theme-sm dark:text-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
