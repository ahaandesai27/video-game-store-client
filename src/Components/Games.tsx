import { gql, useQuery } from '@apollo/client';
import { InView } from 'react-intersection-observer'
import Navbar from './Navbar';

interface Game {
    _id: string;
    title: string;
    url: string;
    price: number;
    coverImage: string;
}

const GET_PRODUCTS = gql`
    query Games($offset: Int!, $limit: Int!) {
        games(offset: $offset, limit: $limit) {
            _id
            title
            url
            price
            coverImage
        }
    }
`;

const limit: number = 8;

export default function Example() {
    const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: { 
          offset: 0,
          limit 
        }
    });
    const games: Game[] = data?.games || []
 

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return <p className="text-white">An error occurred</p>;
    }

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
    
    return (
        <div className="bg-zinc-900 max-h-screen overflow-y-auto">
            <Navbar/>
            <div className="max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {games.map((game: Game) => (
                        <a key={game._id} href={"games/" + game.url} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    alt={game.title}
                                    src={game.coverImage}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-white">{game.title}</h3>
                            {game.price !== 0 ? <p className="mt-1 text-lg font-medium text-white">{game.price}$</p> : <p className="mt-1 text-lg font-medium text-white">Free</p>}
                        </a>
                    ))}
                </div>
                {data &&  (<InView as="div" onChange={getMore}></InView>)}
            </div>
        </div>
    );
}
