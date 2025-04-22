import PageMeta from "../../components/common/PageMeta";
import UsersTableOverview from "../../components/users-overview/UsersTableOverview";
import TopUsersMetrics from "../../components/users-overview/TopUsers";

export default function UsersOverview() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 space-y-6 xl:col-span-12">
        <TopUsersMetrics />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-12">
        <UsersTableOverview />
      </div>
       
      </div>
    </>
  );
}
