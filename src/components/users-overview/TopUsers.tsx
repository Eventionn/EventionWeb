import { UserInEvent } from "../../types/UserInEvent";
import { useEvents } from "../../api/event";
import { useUsers } from "../../api/user";

interface TopOrganizersProps {
  data: UserInEvent[];
}

export default function TopOrganizersMetrics({ data }: TopOrganizersProps) {
  const { data: events } = useEvents();
  const { data: users } = useUsers();
  const userUrl = import.meta.env.VITE_USER_API_URL;
  const isMock = import.meta.env.VITE_MOCKS;

  if (!events || !users) return null;

  const eventMap = new Map(events.map(event => [event.eventID, event]));
  const userMap = new Map(users.map(user => [user.userID, user]));

  const organizerProfits = new Map<string, { userId: string; total: number }>();

  for (const ticket of data) {
    if (!ticket.participated) continue;
    const event = eventMap.get(ticket.event_id);
    if (!event) continue;

    const organizerId = event.userId;
    const currentProfit = organizerProfits.get(organizerId)?.total || 0;

    organizerProfits.set(organizerId, {
      userId: organizerId,
      total: currentProfit + event.price,
    });
  }

  const topOrganizers = Array.from(organizerProfits.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
  const reordered = [topOrganizers[1], topOrganizers[0], topOrganizers[2]];

  const podiumStyles = [
    {
      size: "w-20 h-20",
      label: "🥈 2º Lugar",
      color: "text-gray-400 border-gray-300",
      boxHeight: "h-28",
    },
    {
      size: "w-24 h-24",
      label: "🥇 1º Lugar",
      color: "text-yellow-500 border-yellow-400",
      boxHeight: "h-36",
    },
    {
      size: "w-20 h-20",
      label: "🥉 3º Lugar",
      color: "text-amber-600 border-amber-500",
      boxHeight: "h-24",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-center items-end gap-8 mt-12 w-full max-w-6xl mx-auto px-4">
      {reordered.map((organizer, index) => {
        const user = userMap.get(organizer?.userId || "");
  
        if (!organizer || !user) return null;
  
        const style = podiumStyles[index];
  
        const widthClasses = ["min-w-[160px]", "min-w-[200px]", "min-w-[160px]"];
        const imageSizes = ["w-24 h-24", "w-28 h-28", "w-24 h-24"];
        const boxHeights = ["h-40", "h-48", "h-36"];
  
        return (
          <div
            key={organizer.userId}
            className={`relative flex flex-col items-center justify-end 
              ${boxHeights[index]} ${widthClasses[index]} 
              bg-white dark:bg-white/[0.03] rounded-2xl shadow-lg p-5 
              border-2 ${style.color}`}
          >
            <img
              src={
                isMock === "true"
                  ? user.profilePicture
                  : `${userUrl}${user.profilePicture}`
              }
              alt={user.username || "Organizador"}
              className={`rounded-full border-4 ${style.color} ${imageSizes[index]} object-cover`}
            />
            <div className="mt-3 text-center">
              <div className={`font-bold text-lg ${style.color}`}>
                {style.label}
              </div>
              <div className="text-md text-gray-800 dark:text-gray-100 font-semibold">
                {user.username}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {organizer.total.toLocaleString("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                })}
              </div>
            </div>
  
          </div>
        );
      })}
    </div>
  );
  

}
