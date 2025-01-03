import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { InView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';

import Navbar from '../Navbar';
import GameCard from './GameCard';
import GameRowCard from './GameRowCard';
import PlatformFilter from './Filters/PlatformFilter';
import SearchForm from './Filters/SearchForm';
import PriceSlider from './Filters/PriceSlider';
import CategoryFilter from './Filters/CategoryFilter';
import LoadingPage from '../Utils/Loading';
import ErrorPage from '../Utils/Error';

const limit: number = 8;

interface Game {
    _id: string;
    title: string;
    url: string;
    price: number;
    coverImage: string;
}

const GET_GAMES = gql`
    query Games($offset: Int!, $limit: Int!, $platform: String, $price: Float, $search: String, $category: ID) {
        games(offset: $offset, limit: $limit, platform: $platform, price: $price, search: $search, category: $category) {
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
    const [category, setCategory] = useState<string | null>(null);

    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    const { loading, error, data, fetchMore, refetch } = useQuery(GET_GAMES, {
        variables: { offset: 0, limit },
    });

    const games: Game[] = data?.games || [];

    useEffect(() => {
        refetch({
            offset: 0,
            limit,
            platform,
            price: price !== null ? price : undefined,
            search,
            category,
        });
        console.log(platform, price, search, category);
    }, [platform, price, search, category]);

    const getMore = (inView: boolean) => {
        if (inView) {
            fetchMore({
                variables: {
                    offset: games.length,
                    limit,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        games: [...prev.games, ...fetchMoreResult.games],
                    };
                },
            });
        }
    };

    if (loading) return <LoadingPage />;
    if (error) {
        console.error('Error fetching data:', error);
        return <ErrorPage />;
    }

    return (
        <div className="bg-dark max-h-screen overflow-y-auto">
            <Navbar />

            <div className="flex">
                {/* Products */}
                <div id="products" className="max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
                    {games && games.length === 0 && (
                        <div className="text-white text-xl max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
                            No games found
                        </div>
                    )}
                    {games && !platform && search === '' && (
                        <>
                            <div className="text-white text-2xl font-bold">All games</div> <br />
                        </>
                    )}
                    {games && platform && games.length !== 0 && (
                        <>
                            <div className="text-white text-2xl font-bold">{platform} games</div> <br />
                        </>
                    )}
                    {games && search && games.length !== 0 && (
                        <>
                            <div className="text-white text-2xl font-bold">Search results for "{search}"</div> <br />
                        </>
                    )}
                    <div className={`grid grid-cols-1 gap-x-6 gap-y-10 ${!isMobile ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8' : ''}`}>
                        {games &&
                            games.map((game: Game) =>
                                isMobile ? (
                                    <GameRowCard key={game._id} link={""} {...game} />
                                ) : (
                                    <GameCard key={game._id} link={""} {...game} />
                                )
                            )}
                    </div>

                    {games && <InView as="div" onChange={getMore}></InView>}
                </div>

                {/* Filters */}
                <div id="filters" className="hidden md:block lg:block">
                    <SearchForm setSearch={setSearch} />
                    <PriceSlider setPrice={setPrice} />
                    <PlatformFilter setFilter={setPlatform} />
                    <CategoryFilter setFilter={setCategory} />
                </div>
            </div>
        </div>
    );
}
