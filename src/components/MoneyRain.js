import React from 'react';
import './MoneyRain.css';

const MoneyRain = () => {
  return (
    <div className="money-container">
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="money-bill"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 10}s`,
            animationDelay: `${Math.random() * 2}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        >
          🎼​
        </div>
      ))}
    </div>
  );
};

export default MoneyRain; 