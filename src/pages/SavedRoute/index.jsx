import styles from "./styled.module.css";
import { Section } from "../../components/RouteSections";
import { ResultsContainer } from "../../components/ResultsContainer";
import { useParams, useNavigate } from "react-router-dom";
import {
    useGetRoutesQuery,
    useDeleteRouteMutation
} from "../../redux/routesApi/saveToRoute";
import { Loader } from "../../components/Loader";
import { ReactComponent as Trash } from "../../icons/trash.svg";
import { toast } from 'react-toastify';

export const SavedRoute = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError} = useGetRoutesQuery();
    const [deleteRoute] = useDeleteRouteMutation();

    const handleDeleteRoute = async () => {
        try {
            await deleteRoute(id).unwrap();
            toast.success('Route deleted successfully');
            navigate('/routes');
        } catch (error) {
            toast.error('Failed to delete route');
            console.error('Delete error:', error);
        }
    };

    if (isLoading) return <Loader />;
    if (isError) return <div className={styles.error}>Error loading route</div>;

    const routes = data?.data || [];
    const route = routes.find((r) => String(r.id) === id);

    if (!route) return <div className={styles.error}>Route not found</div>;

    // Мок-дані для тестування
    const savedFlights = [
        {
            id: 1,
            itineraries: [{
                segments: [{
                    departure: { at: "2025-06-15T10:00:00", iataCode: "KBP" },
                    arrival: { at: "2025-06-15T12:00:00", iataCode: "ATH" }
                }],
                duration: "PT2H"
            }],
            price: { total: "150", currency: "EUR" }
        }
    ];


    const savedPlaces = [
        { id: 1, name: "Acropolis of Athens" }
    ];

    return (
        <ResultsContainer>
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1 className={styles.routeName}>{route.name}</h1>
                    <button className={styles.button}>Save Route</button>
                </div>

                <Section
                    title="Saved Flights"
                    items={savedFlights}
                    emptyLinkTo="/flights"
                    type="ticket"
                    departureName="Kyiv"
                    arrivalName="Lviv"
                />
                <Section
                    title="Saved Hotels"
                    emptyLinkTo="/hotels"
                    type="hotel"
                />
                <Section
                    title="Saved Places"
                    items={savedPlaces}
                    emptyLinkTo="/places"
                    type="place"
                />
            </div>
            <div className={styles.buttonFinishDiv}>
                <button className={styles.buttonFinish}>Finish Travel</button>
                <Trash
                    className={styles.TrashSvg}
                    onClick={handleDeleteRoute}
                    style={{ cursor: 'pointer' }}
                    title="Delete route"
                />
            </div>
        </ResultsContainer>
    );
};