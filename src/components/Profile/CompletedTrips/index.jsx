import css from "./styled.module.css";
import { useGetRoutesQuery } from "../../../redux/routesApi/saveToRoute";
import { LittleLoader } from "../../Loader/LittleLoader";
import { useState } from "react";
import { Link } from "react-router";
import { useLocation } from "react-router";

export const CompletedTrips = () => {
  const { data, isLoading } = useGetRoutesQuery();
  const currentLocation = useLocation();
  const [expandedReviews, setExpandedReviews] = useState({});
  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const routes = data?.data || [];

  const completedRoutes = routes.filter((route) => route.isCompleted);

  return (
    <>
      {completedRoutes.length !== 0 ? (
        <div>
          <h2 className={css.name}>Completed trips</h2>
          {isLoading ? (
            <LittleLoader />
          ) : (
            routes
              .filter((route) => route.isCompleted)
              .map((route) => (
                <Link
                  to={`/saved/${route.id}`}
                  key={route.id}
                  state={{ from: currentLocation }}
                >
                  <div className={css.completedTripContainer}>
                    <div className={css.tripImage}>
                      <img
                        src={route.imageUrl}
                        alt="Completed Trip"
                        className={css.tripImageImg}
                      />
                    </div>
                    <div className={css.tripInfo}>
                      <h3 className={css.tripTitle}>{route.name}</h3>
                      <span className={css.tripLabel}>Completed</span>
                      {route.review && (
                        <div className={css.tripReviewBlock}>
                          <p className={css.tripReview}>
                            {expandedReviews[route.id] ||
                            route.review.length <= 150
                              ? route.review
                              : `${route.review.slice(0, 150)}...`}
                          </p>
                          {route.review.length > 150 && (
                            <button
                              className={css.toggleButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                toggleReview(route.id);
                              }}
                            >
                              {expandedReviews[route.id]
                                ? "Show less"
                                : "Read more"}
                            </button>
                          )}
                        </div>
                      )}

                      {route.rating && (
                        <div className={css.tripStars}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>
                              {star <= route.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>
      ) : (
        <p style={{ color: "black" }}>No completed trips yet</p>
      )}
    </>
  );
};
