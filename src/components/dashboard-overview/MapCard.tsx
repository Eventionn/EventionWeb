import Leafletmap from "./LeafletMap";

export default function MapCard() {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Global Event Activity
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Visual representation of event count by country
          </p>
        </div>
        
      </div>
      <div className="mt-4 mb-4">
        <Leafletmap />
      </div>

    </div>
  );
}
