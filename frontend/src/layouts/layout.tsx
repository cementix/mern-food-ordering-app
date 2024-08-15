import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Hero />

      <div className="flex-1 mx-auto py-10 container">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
