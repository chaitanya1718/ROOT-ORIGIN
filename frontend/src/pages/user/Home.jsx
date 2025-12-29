import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import FirstCarousel from "../../components/FirstCarousel";
import BannerOffer from "../../components/BannerOffer";
import SecondCarousel from "../../components/SecondCarousel";

const Home = () => {
  
  return (
    <>
      <Banner />
      <Categories />
      <BannerOffer/>
      <FirstCarousel />
      <SecondCarousel/>
    </>
  );
};

export default Home;
