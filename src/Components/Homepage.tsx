import Navbar from './Navbar';

export default function Homepage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center pt-16 pb-20 px-4 md:px-0">
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

            
            <div className="px-4 md:px-16">
                <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
                    Featured Games
                </h2>
                {/*Poruduct card for game can be added here to display */}
            </div>

        </div>
    );
}
