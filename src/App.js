import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./components/Layout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchTickets = lazy(() => import("./pages/SearchTicketsPage"));
const SearchHotels = lazy(() => import("./pages/HotelsPage"));
const SearchPlaces = lazy(() => import("./pages/PlacesPage"));
const MyRoutesPage = lazy(() => import("./pages/MyRoutesPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="tickets" element={<SearchTickets />} />
          <Route path="hotels" element={<SearchHotels />} />
          <Route path="places" element={<SearchPlaces />} />
          <Route path="routes" element={<MyRoutesPage />} />
          <Route path="register" />
          <Route path="login" />
          <Route path="profile" />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
