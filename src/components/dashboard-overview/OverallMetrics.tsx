import {
  CalenderIcon,
  GroupIcon,
} from "../../icons";
import { Event } from "../../types/Event";
import { User } from "../../types/User";

interface OverallMetricsProps {
  data: Event[];
  users: User[];
}

export default function OverallMetrics({ data, users }: OverallMetricsProps) {

  const activeUsers = users.filter((user) => user.status === true).length;
  const numberofEvents = data.length;
  const pendingEvents = data.filter((event) => event.eventStatus.status === "Pendente").length;

  const activeUserImages = users.map((user) => user.profilePicture).filter((image) => image !== undefined).slice(0, 5);
  const activeEventImages = data.map((event) => event.eventPicture).filter((image) => image !== undefined).slice(0, 5);
  const eventsToApproveImages = data.filter((event) => event.eventStatus.status === "Pendente").map((event) => event.eventPicture).filter((image) => image !== undefined).slice(0, 5);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {activeUsers}
            </h4>
          </div>
          <div className="flex -space-x-2">
            {activeUserImages.map((picture, index) => (
              <div
                key={index}
                className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
              >
                <img
                  width={24}
                  height={24}
                  src={picture}
                  alt={`Team member ${index + 1}`}
                  className="w-full size-6"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CalenderIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Events
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {numberofEvents}
            </h4>
          </div>
          <div className="flex -space-x-2">
            {activeEventImages.map((picture, index) => (
              <div
                key={index}
                className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
              >
                <img
                  width={24}
                  height={24}
                  src={picture}
                  alt={`Team member ${index + 1}`}
                  className="w-full size-6"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <CalenderIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Events to approve
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {pendingEvents}
            </h4>
          </div>
          <div className="flex -space-x-2">
            {eventsToApproveImages.map((picture, index) => (
              <div
                key={index}
                className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
              >
                <img
                  width={24}
                  height={24}
                  src={picture}
                  alt={`Team member ${index + 1}`}
                  className="w-full size-6"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
