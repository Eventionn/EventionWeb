import { User } from "../../types/User";
import { getUserFromToken } from "../../utils/getUserFromToken";

interface UserMetaProps {
  data: User[];
}

export default function UserMetaCard({ data }: UserMetaProps) {
  const isUsingMocks = import.meta.env.VITE_MOCKS === "true";

  const user = isUsingMocks
    ? data[0]
    : (() => {
        const decoded = getUserFromToken();
        if (!decoded) return null;
        return {
          username: decoded.username,
          profilePicture: "", // imagem default
        };
      })();

  if (!user) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            <img
              src={
                user.profilePicture ||
                "https://via.placeholder.com/150?text=Sem+Imagem"
              }
              alt="user"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {user.username}
            </h4>
            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Admin
              </p>
              <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
