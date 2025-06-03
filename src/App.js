import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PrivateRoute } from "./privateRoute";
import { Loader } from "./components/Loader";
import { useGetCurrentUserQuery } from "./redux/auth/authApi";
import { useSelector } from "react-redux";
import { ScrollToTop } from "./utils/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = lazy(() => import("./components/Layout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchTickets = lazy(() => import("./pages/SearchTicketsPage"));
const SearchHotels = lazy(() => import("./pages/HotelsPage"));
const SearchPlaces = lazy(() => import("./pages/PlacesPage"));
const MyRoutesPage = lazy(() => import("./pages/MyRoutesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const EmailConfirmedPage = lazy(() => import("./pages/EmailConfirmedPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPanelPage = lazy(() => import("./pages/AdminPage"));

const PlacePage = lazy(() => import("./pages/PlacePage"));
const SavedRoute = lazy(() =>
  import("./pages/SavedRoute").then((module) => ({
    default: module.SavedRoute,
  }))
);

function App() {
  const isFetchingCurrentUser = useSelector(
    (state) => state.auth.isFetchingCurrentUser
  );
  useGetCurrentUserQuery();
  if (isFetchingCurrentUser) {
    return <Loader />;
  }

  const PrivateAdminRoute = ({ children }) => {
    const role = useSelector((state) => state.auth.role);
    return role && role.includes("Admin") ? children : <Navigate to="/" />;
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tickets" element={<SearchTickets />} />
            <Route path="hotels" element={<SearchHotels />} />
            <Route path="places" element={<SearchPlaces />} />
            <Route path="place" element={<PlacePage />} />

            <Route
              path="routes"
              element={
                <PrivateRoute>
                  <MyRoutesPage />
                </PrivateRoute>
              }
            />

            <Route
              path="saved/:id"
              element={
                <PrivateRoute>
                  <SavedRoute />
                </PrivateRoute>
              }
            />

            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateAdminRoute>
                  <AdminPanelPage />
                </PrivateAdminRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/email-confirm" element={<EmailConfirmedPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
