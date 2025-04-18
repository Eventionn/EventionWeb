import OverallMetrics from "../../components/dashboard-overview/OverallMetrics";
import MonthlyRevenue from "../../components/dashboard-overview/MonthlyRevenue";
import UsersTable from "../../components/dashboard-overview/UsersTable";
import EventsTable from "../../components/dashboard-overview/EventsTable";
import TableCard from "../../components/dashboard-overview/TableCard";
import MapCard from "../../components/dashboard-overview/MapCard";

export default function Overview() {
    return (
        <>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-12">
                    <OverallMetrics />
                </div>
                <div className="col-span-12">
                    <MonthlyRevenue />
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <TableCard title="Users" path="/users">
                        <UsersTable />
                    </TableCard>
                </div>
                <div className="col-span-12 xl:col-span-6">
                    <TableCard title="Events" path="/events">
                        <EventsTable />
                    </TableCard>
                </div>

                <div className="col-span-12">
                    <MapCard />
                </div>
            </div>
        </>
    );
}
