const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
      <div className="flex md:flex-row flex-col justify-between items-center mx-auto container">
        <span className="font-bold text-3xl text-white tracking-tight">
          MernEats.com
        </span>
        <span className="flex gap-4 font-bold text-white tracking-tight">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
