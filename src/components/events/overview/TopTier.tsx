import { useEventById } from "../../../api/event";

const rankStyles = [
    "bg-yellow-400 text-white",   // 1º lugar
    "bg-gray-400 text-white",     // 2º lugar
    "bg-amber-600 text-white",    // 3º lugar
  ];

interface TopTierProps {
    eventID: string;
    participantCount: number;
    rank: number;
}

export default function TopTier({ eventID, participantCount, rank }: TopTierProps) {
    const { data: event, isPending } = useEventById(eventID);
    const userUrl = import.meta.env.VITE_USER_API_URL;
    const isMock = import.meta.env.VITE_MOCKS;
  
    if (isPending) {
      return (
        <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] animate-pulse w-full max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 bg-gray-200 rounded dark:bg-gray-700" />
            <div className="h-3 w-1/3 bg-gray-200 rounded dark:bg-gray-700" />
          </div>
        </div>
      );
    }
  
    if (!event) return null;
  
    return (
      <div
        className={`flex items-center gap-4 p-4 rounded-2xl border w-full max-w-3xl mx-auto
        ${rank === 0 ? "border-yellow-400 shadow-lg" : "border-gray-200"}
        bg-white dark:bg-white/[0.03] dark:border-gray-800`}
      >
        <div className="relative">
          <img
            src={isMock === "true" ? event.eventPicture : `${userUrl}${event.eventPicture}`}
            alt={event.name}
            className="w-16 h-16 object-cover rounded-xl border-2 border-gray-300"
          />
          <div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow ${rankStyles[rank]}`}
          >
            {rank + 1}
          </div>
        </div>
  
        <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
            {event.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {participantCount} participante{participantCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    );
  }
  