import styles from "./styled.module.css";
import { ReactComponent as Arrow } from "../../icons/arrow-right1.svg";
import { Link, useNavigate } from "react-router-dom";
import { useGetRoutesQuery } from "../../redux/routesApi/saveToRoute";
import { Loader } from "../Loader";
import {EmptyCard} from "../EmptyCard";

export const Cards = () => {
    const { data, isLoading, isError } = useGetRoutesQuery();
    const navigate = useNavigate();

    if (isLoading) return <div><Loader /></div>;
    if (isError) return <div className={styles.error}>Error loading routes</div>;

    const routes = data?.data || [];
    const activeRoutes = routes.filter((route) => route.isCompleted === false);

    const handleArrowClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/travel/${id}`);
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Your routes</h2>
                <div className={styles.cards}>
                    {activeRoutes.map((route) => (
                        <Link
                            key={route.id}
                            to={`/saved/${route.id}`}
                            className={styles.card}
                        >

                        <img
                                src={route.imageUrl || "https://placehold.co/300x300"}
                                alt={route.name}
                                className={styles.cardImage}
                            />
                            <div className={styles.cardTitle}>
                                {route.name}
                                <Arrow
                                    className={styles.arrow}
                                    role="button"
                                    aria-label={`Go to travel page for ${route.name}`}
                                    onClick={(e) => handleArrowClick(e, route.id)}
                                />

                            </div>
                        </Link>
                    ))}
                   <EmptyCard/>
                </div>
            </div>
        </div>
    );
};
