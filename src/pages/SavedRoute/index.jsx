import styles from "./styled.module.css";
import { Section } from "../../components/RouteSections";
import { ResultsContainer } from "../../components/ResultsContainer";
import { useParams } from "react-router-dom";
import { useGetRoutesQuery } from "../../redux/routesApi/saveToRoute";
import { Loader } from "../../components/Loader";

export const SavedRoute = () => {
    const { id } = useParams(); // отримаємо id з URL
    const { data, isLoading, isError } = useGetRoutesQuery();

    if (isLoading) return <Loader />;
    if (isError) return <div className={styles.error}>Error loading route</div>;

    const routes = data?.data || [];
    const route = routes.find((r) => String(r.id) === id);


    if (!route) return <div className={styles.error}>Route not found</div>;

    return (
        <ResultsContainer>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.routeName}>{route.name}</h1>
                    <button className={styles.button}>Save Route</button>
                </div>

                <Section title="Saved Flights" emptyLinkTo="/tickets" />
                <Section title="Saved Hotels" emptyLinkTo="/hotels" />
                <Section title="Saved Places" emptyLinkTo="/places" />

            </div>
            <div className={styles.buttonFinishDiv}>
                <button className={styles.buttonFinish}>Finish Travel</button>
            </div>
        </ResultsContainer>

    );
};
