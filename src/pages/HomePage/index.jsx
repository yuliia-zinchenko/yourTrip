import { MainPicture } from "../../components/MainPicture";
import { PopularPlaces } from "../../components/PopularPlaces";
import { Greetings } from "../../components/Greetings";
import { Opportunities } from "../../components/Opportunities";
import { useRef } from "react";

const HomePage = () => {
  const opportunitiesRef = useRef(null);

  const scrollToOpportunities = () => {
    opportunitiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <MainPicture>
        <Greetings scrollToOpportunities={scrollToOpportunities} />
      </MainPicture>
      <PopularPlaces />
      <div ref={opportunitiesRef}>
        <Opportunities />
      </div>
    </>
  );
};

export default HomePage;
