import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <div className="py-6 border-b-2 border-b-orange-500">
      {/* Main logo */}
      <div className="flex justify-between items-center mx-auto container">
        <Link
          to="/"
          className="font-bold text-3xl text-orange-500 tracking-tight"
        >
          MernEats.com
        </Link>

        {/* Mobile navigation menu */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
