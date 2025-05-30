import { AppBar } from "../AppBar";
import { Footer } from "../Footer";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../Loader";

const Layout = () => {

    return (
        <div
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
            <AppBar />
            <Suspense fallback={<Loader />}>
                <div style={{ flex: 1 }}>
                    <Outlet />
                </div>
                <Footer />
            </Suspense>
    </div>
  );
};
export default Layout;
