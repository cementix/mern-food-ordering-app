import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileFormSkeleton = () => {
  return (
    <div className="space-y-4 bg-gray-50 md:p-10 rounded-lg">
      <Skeleton height={40} width={200} />
      <Skeleton height={20} width={250} className="mb-3" />

      <Skeleton height={30} width="20%" />
      <Skeleton height={35} width="100%" className="mb-4" />

      <Skeleton height={30} width="20%" />
      <Skeleton height={35} width="100%" className="mb-4" />

      <Skeleton height={45} width="100%" />

      <Skeleton height={40} width="6%" />
    </div>
  );
};

export default UserProfileFormSkeleton;
