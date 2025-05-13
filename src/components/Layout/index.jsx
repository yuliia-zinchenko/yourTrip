import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../Loader";

const Layout = () => {
  return (
    <div style={{ margin: "0 auto", padding: "0" }}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
