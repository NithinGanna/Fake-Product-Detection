import React from 'react'
import { PostNavBar } from '../Components/PostNavBar'
import ImageSlider from '../CustomerPages/ImageSlider';

const Manufacturer = () => {
  const slides = [
    { url: "/manu_img_1.png", title: "beach" },
    { url: "/manu_img_2.png", title: "boat" },
    { url: "/manu_img_3.png", title: "forest" },
    { url: "/manu_img_4.png", title: "forest" }
  ];

  const containerStyles = {
    width: "1450px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div>
      <PostNavBar/>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};


export default Manufacturer