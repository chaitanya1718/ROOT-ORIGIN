import Banner from "../../components/Banner";
import Categories from "../../components/Categories";
import FirstCarousel from "../../components/FirstCarousel";
import BannerOffer from "../../components/BannerOffer";
import SecondCarousel from "../../components/SecondCarousel";
import CategoriesComponent from "./CategoriesComponent";

import { useParams } from "react-router-dom";




const CategoriesPage = () => {
     const { categoryName } = useParams();
  return (
    <>
      <Categories />
      <CategoriesComponent categoryName={categoryName} />
    </>
  );
};

export default CategoriesPage;
