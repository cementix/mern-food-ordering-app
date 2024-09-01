import { useSearchRestaurants } from "@/api/RestaurantApi";
import LoaderScreen from "@/components/LoaderScreen";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    return <LoaderScreen />;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="gap-5 grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">insert cuisines here :</div>
      <div>
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results.data.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
