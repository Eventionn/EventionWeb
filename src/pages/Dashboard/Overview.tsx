import OverallMetrics from "../../components/dashboard-overview/OverallMetrics";
import MonthlyRevenue from "../../components/dashboard-overview/MonthlyRevenue";
import UsersTable from "../../components/dashboard-overview/UsersTable";
import EventsTable from "../../components/dashboard-overview/EventsTable";
import TableCard from "../../components/dashboard-overview/TableCard";
import MapCard from "../../components/dashboard-overview/MapCard";
import { useEvents } from "../../api/event";
import { useUsers } from "../../api/user";
import { useUserInEvents } from "../../api/userinevent";

export default function Overview() {

    const { data, isPending, isError } = useEvents();
    const { data: users, isPending: isPendingUsers, isError:isErrorUsers } = useUsers();
    const { data: events, isPending: isPendingEvents, isError:isErrorEvents } = useEvents();
    const { data: tickets, isPending: isPendingTickets, isError:isErrorTickets } = useUserInEvents();

    return (
        <>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <OverallMetrics data={isPending || isError || !data ? null : data} users={isPending || isError || !users ? null : users} />
                </div>
                <div className="col-span-12">
                    <MonthlyRevenue data={tickets || []} />
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <TableCard title="Users" path="/users">
                        <UsersTable data={users || []} />
                    </TableCard>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <TableCard title="Events" path="/events">
                        <EventsTable data={events || []} />
                    </TableCard>
                </div>

                <div className="col-span-12">
                    <MapCard />
                </div>
            </div>
        </>
    );
}
