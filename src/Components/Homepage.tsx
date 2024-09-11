import Navbar from './Navbar';
import GameCarousel from './GameCarousel';

export default function Homepage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center pt-16 pb-10 px-4 md:px-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                    Discover & Buy the Best Games
                </h1>
                <p className="text-lg md:text-xl text-center max-w-2xl mb-8">
                    Browse our collection of games, read reviews, and find your next favorite adventure.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md">
                    Explore Now
                    {/* for now this button does not work */}
                </button>
            </div>

            
            <GameCarousel />

        </div>
    );
}
