import Navbar from '../Navbar';
import GameCarousel from './GameCarousel'; 
import NewReleases from './NewReleases';
import Recomms from './Recomms'

export default function Homepage() {;
    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center pt-16 px-4 md:px-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                    Discover & Buy the Best Games at <p className='text-purple-500'>GameShop</p>
                </h1>
                <p className="text-lg md:text-xl max-w-3xl">
                    Browse our collection of games, read reviews, and find your next favorite adventure.
                </p>
            </div>
            <GameCarousel />
            <div className="sm:px-8 px-5 text-4xl font-bold text-white mb-8">
                New Releases
            </div>
            <NewReleases />
            <div className="pt-4 sm:px-8 px-5 text-4xl font-bold text-white mb-8">
                Recommended for you
            </div>
            <Recomms />

        </div>
    );
}
