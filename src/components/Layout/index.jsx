import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ margin: "0 auto", padding: "0" }}>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Layout;
