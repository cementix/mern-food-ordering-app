import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { ReactNode } from "react";

const Layout = ({
  children,
  showHero,
}: {
  children: ReactNode;
  showHero?: boolean;
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {showHero && <Hero />}

      <div className="flex-1 mx-auto py-10 container">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
