import { Event } from "../../../types/Event";
import { useApproveEvent, useDeleteEvent } from "../../../api/event";

interface ApproveEventsTableProps {
    data: Event[] | undefined;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function ApproveEventsTable({
    data,
    page,
    totalPages,
    onPageChange,
}: ApproveEventsTableProps) {
    const approveEventMutation = useApproveEvent();
    const rejectEventMutation = useDeleteEvent();
    const eventUrl = import.meta.env.VITE_EVENT_API_URL;
    const isMock = import.meta.env.VITE_MOCKS;

    const handlePageClick = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    const handleApprove = (eventId: string) => {
        approveEventMutation.mutate({ id: eventId });
    };

    const handleReject = (eventId: string) => {
        rejectEventMutation.mutate(eventId);
    };

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data!.map((event) => (
                    <div
                        key={event.eventID}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-xl shadow overflow-hidden flex flex-col h-full"
                    >
                        <div className="w-full h-35 overflow-hidden">
                            <img
                                src={isMock === 'true' ? event.eventPicture : `${eventUrl}${event.eventPicture}`}
                                alt={event.name}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <div className="p-4 flex flex-col justify-between flex-1 h-full">
                            <div className="text-start flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {event.description}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => handleReject(event.eventID)}
                                    className="flex-1 bg-red-100 text-red-700 text-sm py-2 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800 transition font-medium"
                                >
                                    Reject
                                </button>

                                <button
                                    onClick={() => handleApprove(event.eventID)}
                                    className="flex-1 bg-green-100 text-green-700 text-sm py-2 rounded-lg hover:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:hover:bg-green-800 transition font-medium"
                                >
                                    Approve
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-2 py-4">
                <button
                    disabled={page === 1}
                    onClick={() => handlePageClick(page - 1)}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                    Back
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageClick(i + 1)}
                        className={`px-3 py-1 text-sm border rounded ${page === i + 1 ? "bg-gray-200 dark:bg-gray-700" : ""}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    disabled={page === totalPages}
                    onClick={() => handlePageClick(page + 1)}
                    className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
