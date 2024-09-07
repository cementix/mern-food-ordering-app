import { Link } from "react-router-dom";

const SearchResultInfo = ({ total, city }: { total: number; city: string }) => {
  return (
    <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-3 mb-5 font-bold text-xl">
      <span className="flex items-center gap-5">
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="font-semibold text-blue-500 text-sm underline cursor-pointer"
        >
          Change location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
