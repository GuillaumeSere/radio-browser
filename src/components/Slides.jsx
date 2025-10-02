import React, { useEffect, useState } from 'react';
import img1 from '../images/image1.png';
import img2 from '../images/image2.png';
import img3 from '../images/image3.png';
import img4 from '../images/image4.png';
import img5 from '../images/image5.png';
import img6 from '../images/image6.png';
import img7 from '../images/image7.png';
import img8 from '../images/image8.png';
import img9 from '../images/image9.png';
import img10 from '../images/image10.png';
import img11 from '../images/image11.png';
import img12 from '../images/image12.png';
import img13 from '../images/image13.png';
import img14 from '../images/image14.png';
import img15 from '../images/image15.png';
import img16 from '../images/image16.png';
import img17 from '../images/image17.png';
import img18 from '../images/image18.png';
import img19 from '../images/image19.png';
import img20 from '../images/image20.png';
import img21 from '../images/image21.png';
import img22 from '../images/image22.png';
import img23 from '../images/image23.png';
import img24 from '../images/image24.png';

const Slides = () => {
  const images = [
    img1, img2, img3, img4, img5, img6, img7, img8,
    img9, img10, img11, img12, img13, img14, img15, img16,
    img17, img18, img19, img20, img21, img22, img23, img24,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slides">
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="slide fade"
      />
    </div>
  );
};

export default Slides;


