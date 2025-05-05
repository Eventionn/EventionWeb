import { useEventById } from "../../../api/event";

const rankStyles = [
    "bg-yellow-400 text-white",
    "bg-gray-400 text-white",
    "bg-orange-400 text-white"
];

interface TopTierProps {
    eventID: string;
    participantCount: number;
    rank: number;
}

export default function TopTier({ eventID, participantCount, rank }: TopTierProps) {
    const { data: event, isPending } = useEventById(eventID);

    if (isPending) {
        return (
            <div
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03] animate-pulse"
            >
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700" />
    
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded dark:bg-gray-700" />
                        <div className="h-3 w-24 bg-gray-200 rounded dark:bg-gray-700" />
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div
            className={`flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03] ${rank === 0 ? "shadow-md" : ""}`}
        >
            <div className="flex items-center gap-3">
                <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${rankStyles[rank]}`}
                >
                    {rank + 1}
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 text-base dark:text-white/90">
                        {event?.name}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {`${participantCount} participante${participantCount !== 1 ? 's' : ''}`}
                    </span>

                </div>
            </div>
        </div>
    );
}
