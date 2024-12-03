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

const Slides = () => {
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11,
        img12,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change d'image toutes les 3 secondes

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slides">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        </div>
    );
};

export default Slides;
