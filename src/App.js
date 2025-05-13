import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PrivateRoute } from "./privateRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "./components/Loader";
import { authApi } from "./redux/auth/authApi";

const Layout = lazy(() => import("./components/Layout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchTickets = lazy(() => import("./pages/SearchTicketsPage"));
const SearchHotels = lazy(() => import("./pages/HotelsPage"));
const SearchPlaces = lazy(() => import("./pages/PlacesPage"));
const MyRoutesPage = lazy(() => import("./pages/MyRoutesPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authApi.endpoints.getCurrentUser.initiate());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tickets" element={<SearchTickets />} />
          <Route path="hotels" element={<SearchHotels />} />
          <Route path="places" element={<SearchPlaces />} />
          <Route
            path="routes"
            element={
              <PrivateRoute>
                <MyRoutesPage />
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
