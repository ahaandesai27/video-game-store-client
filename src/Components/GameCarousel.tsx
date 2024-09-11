import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const GameCarousel = () => {
  const [games] = useState([
    { id: 1, image: '/game1.jpg' },
    { id: 2, image: '/game2.jpg' },
    { id: 3, image: '/game3.jpg' },
    { id: 4, image: '/game4.jpg' },
    // { id: 5, image: '/game5.jpg' },
  ]);

  return (
    <div className="flex justify-center items-center  bg-black py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-4xl font-bold text-white mb-8">
          Featured Games
        </h2>
        <Carousel
          axis="horizontal"
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          transitionTime={1000}
        >
          {games.map((game) => (
            <div key={game.id} className="relative h-72">
              <img
                src={game.image}
                alt={`Game ${game.id}`}
                className="w-full h-72 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default GameCarousel;