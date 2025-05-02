import { Event } from "../../../types/Event";

const rankStyles = [
  "bg-yellow-400 text-white",
  "bg-gray-400 text-white",
  "bg-orange-400 text-white"
];

interface TopEventsProps {
  data: Event[];
}

export default function TopEventsMetrics({ data }: TopEventsProps) {
  const events = data.filter((event) => event.eventStatus.status !== "Pendente" && event.eventStatus.status !== "Aprovado").slice(0, 3);
  console.log(events);
  // return (
  //   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
  //     {events.map((event, index) => (
  //       <div
  //         key={event.eventID}
  //         className={`flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03] ${index === 0 ? "shadow-md" : ""
  //           }`}
  //       >
  //         <div className="flex items-center gap-3">
  //           <div
  //             className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${rankStyles[index]}`}
  //           >
  //             {index + 1}
  //           </div>

  //           <div>
  //             <span className="text-sm text-gray-500 dark:text-gray-400">{event.name}</span>
  //             <h4 className="font-bold text-gray-800 text-base dark:text-white/90">
  //               ---
  //             </h4>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
}
