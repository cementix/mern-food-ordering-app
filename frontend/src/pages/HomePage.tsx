import appDownloadImage from "../assets/appDownload.png";
import landingImage from "../assets/landing.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 bg-white shadow-md -mt-16 py-8 rounded-lg text-center">
        <h1 className="font-bold text-5xl text-orange-600 tracking-tight">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>

      <div className="gap-5 grid md:grid-cols-2">
        <img src={landingImage} />
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
