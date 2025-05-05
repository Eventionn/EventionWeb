import UsersTableOverview from "../../components/users-overview/UsersTableOverview";
import TopUsersMetrics from "../../components/users-overview/TopUsers";
import { userMocks } from "../../mocks/userMock";
import { useUsers } from "../../api/user";

export default function UsersOverview() {

  const { data, isPending, isError } = useUsers();

  //console.log(data);

  if(data?.length === 0) return <p>Nenhum User encontrado.</p>;
  if (isPending) return <p>Carregando Users...</p>;
  if (isError) return <p>Erro ao carregar Users.</p>;

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-12">
        <TopUsersMetrics data={userMocks} />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-12">
        <UsersTableOverview data={data}/>
      </div>
       
      </div>
    </>
  );
}
