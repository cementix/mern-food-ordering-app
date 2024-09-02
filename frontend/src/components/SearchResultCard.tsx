import { Restaurant } from "@/types";
import { Banknote, Clock, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";

const SearchResultCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="gap-5 grid lg:grid-cols-[2fr_3fr] mb-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="mb-2 font-bold text-2xl group-hover:underline tracking-tight">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="gap-2 grid md:grid-cols-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-1">
              <Banknote /> Delivery from $
              {(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
