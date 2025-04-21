import {
    ArrowDownIcon,
    ArrowUpIcon,
    CalenderIcon,
    GroupIcon,
  } from "../../icons";
  import Badge from "../ui/badge/Badge";
  
  const events = [
    {
      id: 1,
      name: "Event 1",
      value: "254.261",
      change: "11.01%",
      changeType: "up",
      icon: <GroupIcon className="text-gray-800 size-5 dark:text-white/90" />,
    },
    {
      id: 2,
      name: "Event 2",
      value: "5,359",
      change: "9.05%",
      changeType: "down",
      icon: <CalenderIcon className="text-gray-800 size-5 dark:text-white/90" />,
    },
    {
      id: 3,
      name: "Event 3",
      value: "5,359",
      change: "10.5%",
      changeType: "down",
      icon: <CalenderIcon className="text-gray-800 size-5 dark:text-white/90" />,
    },
  ];
  
  const rankStyles = [
    "bg-yellow-400 text-white",
    "bg-gray-400 text-white", 
    "bg-orange-400 text-white"
  ];
  
  export default function TopEventsMetrics() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03] ${
              index === 0 ? "shadow-md" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Rank Badge */}
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${rankStyles[index]}`}
              >
                {index + 1}
              </div>
  
              {/* Event Info */}
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{event.name}</span>
                <h4 className="font-bold text-gray-800 text-base dark:text-white/90">
                  {event.value}
                </h4>
              </div>
            </div>
            
            <Badge color={event.changeType === "up" ? "success" : "error"}>
              {event.changeType === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
              {event.change}
            </Badge>
          </div>
        ))}
      </div>
    );
  }
  