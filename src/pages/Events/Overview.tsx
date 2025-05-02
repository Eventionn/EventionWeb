// import TopEventsMetrics from "../../components/events/overview/TopEvents";
import EventsTable from "../../components/events/overview/Table";
import { useEvents } from "../../api/event";

export default function EventsOverview() {
    const { data, isPending, isError } = useEvents();

    console.log(data);

    if(data?.length === 0) return <p>Nenhum evento encontrado.</p>;
    if (isPending) return <p>Carregando eventos...</p>;
    if (isError) return <p>Erro ao carregar eventos.</p>;
    return (
        <>
            {/* <TopEventsMetrics data={data} /> */}
            <EventsTable data={data}/>

           </>



    );
}
