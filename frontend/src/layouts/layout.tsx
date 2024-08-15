import Header from "@/components/Header";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1 mx-auto py-10 container">{children}</div>
    </div>
  );
};

export default Layout;
