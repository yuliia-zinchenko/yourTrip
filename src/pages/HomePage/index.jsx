import { MainPicture } from "../../components/MainPicture";
import { PopularPlaces } from "../../components/PopularPlaces";
import { Greetings } from "../../components/Greetings";
import { Opportunities } from "../../components/Opportunities";

const HomePage = () => {
  return (
    <>
      <MainPicture>
        <Greetings />
      </MainPicture>
      <PopularPlaces />
      <Opportunities />
    </>
  );
};

export default HomePage;
