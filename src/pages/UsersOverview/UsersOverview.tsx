import UsersTableOverview from "../../components/users-overview/UsersTableOverview";
import TopUsersMetrics from "../../components/users-overview/TopUsers";
import { useUsers } from "../../api/user";
import { useUserInEvents } from "../../api/userinevent";

export default function UsersOverview() {

  const { data, isPending, isError } = useUsers();
  const { data: tickets } = useUserInEvents()

  //console.log(data);

  if (data?.length === 0) return <p>Nenhum User encontrado.</p>;
  if (isPending) return <p>Carregando Users...</p>;
  if (isError) return <p>Erro ao carregar Users.</p>;

  return (
    <>
      <div className="col-span-12">
          {tickets && tickets.length > 0 ? <TopUsersMetrics data={tickets} /> : null}

      </div>

      <hr className="col-span-12 border-t border-gray-200 dark:border-white/10 my-6" />

      <div className="col-span-12">
        <div className="mt-4">
          <UsersTableOverview data={data} />
        </div>
      </div>

    </>
  );
}
