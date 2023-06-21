import React from 'react';
import DishCarousel from '../Dish_Carousel';
import TopDish from '../carousel3';
import Album from '../Homecards';





function Home() {
    return (
      <div className="container-fluid"><br/>
        <DishCarousel></DishCarousel><br/>
        <TopDish></TopDish><br/>
        <Album/>
      </div>
    );
  }

  export default Home;
