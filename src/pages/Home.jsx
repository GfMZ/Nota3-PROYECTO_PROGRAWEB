import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';
import NewSeries from '../components/NewSeries';
import NewProducts from '../components/NewProducts';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="gp-site">
      <Header />
      <main>
        <Banner />
        <Categories />
        <BestSellers />
        <NewSeries />
        <NewProducts />
      </main>
      <Footer />
    </div>
  );
}
