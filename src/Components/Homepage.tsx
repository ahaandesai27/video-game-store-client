import Navbar from './Navbar';
import GameCarousel from './GameCarousel'; 
    

export default function Homepage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center pt-16 px-4 md:px-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                    Discover & Buy the Best Games
                </h1>
                <p className="text-lg md:text-xl max-w-3xl">
                    Browse our collection of games, read reviews, and find your next favorite adventure.
                </p>
            </div>
            <GameCarousel />

        </div>
    );
}
