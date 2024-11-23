import Image from 'next/image';
import Head from 'next/head';
import Footer from '../components/Home/Footer';
import Testimonial from '../components/Home/Testimonial';
import SEO from '../components/seo';
import HomeThreeHeader from "../components/HomeThree/HomeThreeHeader";
import HomeThreeHeroArea from "../components/HomeThree/HomeThreeHeroArea";
import FeaturedItem from "../components/HomeThree/FeaturedItem";
import NewestItems from "../components/HomeThree/NewestItems";
import FeaturedThemesProducts from "../components/HomeThree/FeaturedThemesProducts";
import TamplatesNeed from "../components/HomeThree/TamplatesNeed";

export default function Home() {

  return (
    <>
        <SEO pageTitle={'Home Default'} />
        <HomeThreeHeader/>
        <HomeThreeHeroArea/>
        <FeaturedItem/>
        <NewestItems/>
        <FeaturedThemesProducts/>
        <TamplatesNeed/>
        <Testimonial/>
        <Footer/>
    </>
  )
}
