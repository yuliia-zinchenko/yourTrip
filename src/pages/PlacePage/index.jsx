import styles from "./styled.module.css";
import { PlaceHeader } from "../../components/Place/PlaceHeader";
import { PlaceGallery } from "../../components/Place/PlaceGallery";
import { PlaceMap } from "../../components/Place/PlaceMap";
import { PlaceInfo } from "../../components/Place/PlaceInfo";
import { PlaceReviews } from "../../components/Place/PlaceRewiews";
import { useGetOnePlaceDetailsQuery } from "../../redux/places/placesResultApi";
import { Loader } from "../../components/Loader";
import { useSearchParams, useLocation } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { SaveButton } from "../../components/SaveButton";
import { useRef } from "react";
import { ReactComponent as Save } from "../../icons/suit-heart.svg";

const PlacePage = () => {
  const currentLocation = useLocation();
  const backHrefLocation = useRef(currentLocation.state?.from ?? "/");
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("place_id");
  const { data, error, isLoading } = useGetOnePlaceDetailsQuery(placeId, {
    skip: !placeId,
  });

  if (isLoading) return <Loader />;
  if (error) return <p className={styles.error}>Error loading place details</p>;
  if (!data) return null;

  console.log(data);
  console.log(data.type);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <BackButton backTo={backHrefLocation.current} />
        <PlaceHeader name={data.name} address={data.formatted_address} />
        <SaveButton
          className={styles.saveButton}
          itemType={data.type}
          placeId={placeId}
        >
          <Save className={styles.icon} />
        </SaveButton>
      </div>

      <PlaceGallery photos={data.photoUrl} />
      <PlaceMap lat={data.latitude} lng={data.longitude} name={data.name} />
      <PlaceInfo data={data} />
      <PlaceReviews reviews={data.reviews} />
    </div>
  );
};

export default PlacePage;
