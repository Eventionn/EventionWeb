import { User } from "../../types/User";

interface TopUsersProps {
  data:User[];
}

export default function TopUsersMetrics({ data }: TopUsersProps) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

        <img src="images/user/user-10.jpg" alt="User" className="w-20 h-20 mx-auto rounded-full" />
        
        <div className="flex items-end justify-center mt-1">
          <div className="text-center">
            
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              Orkun Kökçü
            </h4>
            <span className=" font-bold text-gray-500 dark:text-gray-400 block">
              Top 1
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Profit: 12,500€
            </span>

            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
  
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

        <img src="images/user/user-27.jpg" alt="User" className="w-20 h-20 mx-auto rounded-full" />
        
        <div className="flex items-end justify-center mt-1">
          <div className="text-center">
            
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              Fredrik Aursnes
            </h4>
            <span className=" font-bold text-gray-500 dark:text-gray-400 block">
              Top 2
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Profit: 10,200€
            </span>

            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
  
        {/* <!-- Metric Item Start --> */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

        <img src="images/user/user-01.jpg" alt="User" className="w-20 h-20 mx-auto rounded-full" />
        
        <div className="flex items-end justify-center mt-1">
          <div className="text-center">
            
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              Vangelis Pavlidis
            </h4>
            <span className=" font-bold text-gray-500 dark:text-gray-400 block">
              Top 3
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Profit: 8,950€
            </span>

            </div>
          </div>
        </div>
        {/* <!-- Metric Item End --> */}
      </div>
    );
  }
  