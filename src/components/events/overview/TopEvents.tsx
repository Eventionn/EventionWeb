import { useEffect, useState } from "react";
import { useEventById } from "../../../api/event";
import { UserInEvent } from "../../../types/UserInEvent";

const rankStyles = [
  "bg-yellow-400 text-white",
  "bg-gray-400 text-white",
  "bg-orange-400 text-white"
];

interface TopUserInEventsProps {
  data: UserInEvent[] | undefined;
}

interface RankedEvent {
  eventID: string;
  participantCount: number;
}

export default function TopEventsMetrics({ data }: TopUserInEventsProps) {
  const [topRankedEvents, setTopRankedEvents] = useState<RankedEvent[]>([]);

  useEffect(() => {
    if (!data) return;

    const map: Record<string, number> = {};
    data.forEach(({ eventID }) => {
        map[eventID] = (map[eventID] || 0) + 1;
      
    });

    const sorted = Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([eventID, count]) => ({
        eventID,
        participantCount: count,
      }));

    setTopRankedEvents(sorted);
  }, [data]);

  const eventA = useEventById(topRankedEvents[0]?.eventID);
  const eventB = useEventById(topRankedEvents[1]?.eventID);
  const eventC = useEventById(topRankedEvents[2]?.eventID);

  const events = [eventA, eventB, eventC];

  const topEvents = topRankedEvents.map((ranked, i) => {
    const event = events[i];
    return event?.data
      ? {
          eventID: ranked.eventID,
          participantCount: ranked.participantCount,
          name: event.data.name,
        }
      : null;
  }).filter(Boolean);

  console.log(topEvents);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {topEvents.map((event, index) => (
        <div
          key={event!.eventID}
          className={`flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03] ${index === 0 ? "shadow-md" : ""}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${rankStyles[index]}`}
            >
              {index + 1}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-base dark:text-white/90">
                {event!.name}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {event!.participantCount} participantes
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
