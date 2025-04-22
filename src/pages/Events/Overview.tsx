import TopEventsMetrics from "../../components/events/overview/TopEvents";
import EventsTable from "../../components/events/overview/Table";
import { eventMocks } from "../../mocks/eventMock";

export default function EventsOverview() {
    return (
        <>
            <TopEventsMetrics data={eventMocks} />
            <EventsTable data={eventMocks}/>

           </>



    );
}
