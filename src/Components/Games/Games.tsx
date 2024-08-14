import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { InView } from 'react-intersection-observer'

import Navbar from '../Navbar';
import GameCard from './GameCard';  
import Filter from './DropdownFilter';
import SearchForm from './SearchForm';
import PriceSlider from './PriceSlider';  

const limit: number = 8;

interface Game {
    _id: string;
    title: string;
    url: string;
    price: number;
    coverImage: string;
}

const GET_GAMES = gql`
    query Games($offset: Int!, $limit: Int!, $platform: String, $price: Float, $search: String) {
        games(offset: $offset, limit: $limit, platform: $platform, price: $price, search: $search) {
            _id
            title
            url
            price
            coverImage
        }
    }
`;

export default function Example() {
    const [platform, setPlatform] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [search, setSearch] = useState<string | null>(null);
    //const [genre, setGenre] = useState<string | null>(null);

    //Initial fetch
    const { loading, error, data, fetchMore, refetch } = useQuery(GET_GAMES, {
        variables: { 
          offset: 0,
          limit: limit,
        }
    });

    const games: Game[] = data?.games || []

    //Re-renders on applying filters
    useEffect(() => {
        refetch({
            offset: 0,
            limit: limit,
            platform: platform,
            price: price !== null ? price : undefined,
            search: search
        })
    }, [platform, price, search])
    
    //Gets more games on scrolling
    const getMore = (inView: any ) => {
        if (inView) {
            fetchMore({
                variables: {
                    offset: games?.length,
                    limit
                },
                updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        games: [...prev.games, ...fetchMoreResult.games]
                    }
                }
            })
        }
    }
    
    if (loading) return <p className="text-white">Loading...</p>;
    if (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return <p className="text-white">An error occurred</p>;
    }

    return (
        <div className="bg-dark max-h-screen overflow-y-auto">
            <Navbar/>

            <div className='flex'>
                {/* Products */}
                <div id="products" className="max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
                    {games && games.length === 0 && <div className="text-white text-xl max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">No games found</div>}
                    {games && !platform && search == "" && <><div className='text-white text-2xl font-bold'>All games</div> <br /></>}
                    {games && platform && games.length != 0 && <><div className='text-white text-2xl font-bold'>{platform} games</div> <br /></>}
                    {games && search && games.length != 0 && <><div className='text-white text-2xl font-bold'>Search results for "{search}"</div> <br /></>}
                    
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {games && games.map((game: Game) => <GameCard key={game._id} {...game} />)}
                    </div>
                    
                    {games &&  (<InView as="div" onChange={getMore}></InView>)}
                </div>

                {/* Filters */}
                <div id="filters" className="hidden md:block lg:block">
                    <SearchForm setSearch={setSearch}/>
                    <PriceSlider setPrice={setPrice} />
                    <Filter title="Platform" items={['PC', 'PS5', 'Xbox', 'Switch']} setFilter={setPlatform}/>
                    {/* <Filter title="Genre" items={['Action', 'Adventure', 'RPG', 'Simulation', 'Strategy']} setState={setGenre}/> */}
                </div>

            </div>
        </div>
    );
}
