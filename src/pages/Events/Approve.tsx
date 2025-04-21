import { useState } from "react";
import ApproveEventsTable from "../../components/events/approve/Table";
import ApproveEventsCardView from "../../components/events/approve/CardView";
import { GridIcon, ListIcon } from "../../icons";

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

const tableData: Order[] = [
    {
        id: 1,
        user: {
            image: "/images/user/event-1.jpg",
            name: "Lindsey Curtis",
            role: "Web Designer",
        },
        projectName: "Agency Website",
        status: "Active",
    },
    {
        id: 2,
        user: {
            image: "/images/user/event-2.jpeg",
            name: "Kaiya George",
            role: "Project Manager",
        },
        projectName: "Technology",
        status: "Pending",
    },
    {
        id: 3,
        user: {
            image: "/images/user/event-3.jpg",
            name: "Zain Geidt",
            role: "Content Writing",
        },
        projectName: "Blog Writing",
        status: "Active",
    },
    {
        id: 4,
        user: {
            image: "/images/user/event-4.jpg",
            name: "Abram Schleifer",
            role: "Digital Marketer",
        },
        projectName: "Social Media",
        status: "Cancel",
    },
    {
        id: 5,
        user: {
            image: "/images/user/event-5.webp",
            name: "Carla George",
            role: "Front-end Developer",
        },
        projectName: "Website",
        status: "Active",
    }
];

export default function ApproveEvents() {
    const [viewType, setViewType] = useState<"table" | "card">("table");

    return (
        <>
            <div className="flex justify-end mb-4">
                <div className="inline-flex items-center gap-1 rounded-md border p-1 dark:border-white/10">
                    <button
                        onClick={() => setViewType("table")}
                        className={`p-2 rounded-md transition-colors ${viewType === "table"
                                ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            }`}
                        title="List View"
                    >
                        <ListIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewType("card")}
                        className={`p-2 rounded-md transition-colors ${viewType === "card"
                                ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                                : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                            }`}
                        title="Card View"
                    >
                        <GridIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {viewType === "table" ? (
                <ApproveEventsTable tableData={tableData} />
            ) : (
                <ApproveEventsCardView tableData={tableData} />
            )}
        </>
    );
}
