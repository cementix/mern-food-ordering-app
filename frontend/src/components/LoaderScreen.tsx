import { LoaderCircle } from "lucide-react";

const LoaderScreen = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <LoaderCircle className="text-orange-500 animate-spin" size={40} />;
    </div>
  );
};

export default LoaderScreen;
