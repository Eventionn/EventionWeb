import UsersTableOverview from "../../components/users-overview/UsersTableOverview";
import TopUsersMetrics from "../../components/users-overview/TopUsers";
import { userMocks } from "../../mocks/userMock";

export default function UsersOverview() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-12">
        <TopUsersMetrics data={userMocks} />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-12">
        <UsersTableOverview data={userMocks}/>
      </div>
       
      </div>
    </>
  );
}
