import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../../ui/table";

import { useState } from "react";
import { MoreDotIcon } from "../../../icons";
import { Dropdown } from "../../ui/dropdown/Dropdown";
import { DropdownItem } from "../../ui/dropdown/DropdownItem";
import { Event } from "../../../types/Event";

interface ApproveEventsTableProps {
    tableData: Event[];
}

export default function ApproveEventsTable({ tableData }: ApproveEventsTableProps) {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = tableData.slice(startIndex, endIndex);

    const toggleDropdown = (id: string) => {
        setOpenDropdownId((prev) => (prev === id ? null : id));
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString("pt-PT", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    const closeDropdown = () => {
        setOpenDropdownId(null);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    console.log("TableData:", tableData.length, tableData);

    return (
        <div className="overflow-hidden mt-5 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Event</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Start</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">End</TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Price</TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {paginatedData.map((event) => (
                            <TableRow key={event.eventID}>
                                <TableCell className="px-5 py-4 sm:px-6 text-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 overflow-hidden rounded-full">
                                            <img
                                                src={event.eventPicture}
                                                alt={event.name}
                                                width={40}
                                                height={40}
                                                className="object-cover object-center w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                                                {event.name}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {formatDate(event.startAt)}
                                </TableCell>

                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {formatDate(event.endAt)}
                                </TableCell>


                                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                                    {event.price > 0 ? event.price + ' €' : 'Free'}
                                </TableCell>

                                <TableCell className="relative">
                                    <button className="dropdown-toggle" onClick={() => toggleDropdown(event.eventID)}>
                                        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
                                    </button>

                                    <Dropdown
                                        isOpen={openDropdownId === event.eventID}
                                        onClose={closeDropdown}
                                        className="absolute right-full top-0 mr-2 z-10 w-40 p-2"
                                    >
                                        <DropdownItem
                                            onItemClick={closeDropdown}
                                            className="px-3 py-2 rounded-md hover:bg-green-100 dark:hover:bg-green-700 text-green-600 dark:text-green-400"
                                        >
                                            Approve
                                        </DropdownItem>
                                        <DropdownItem
                                            onItemClick={closeDropdown}
                                            className="px-3 py-2 rounded-md hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400"
                                        >
                                            Reject
                                        </DropdownItem>
                                    </Dropdown>


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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