import { useParams } from "react-router";
import { gql, useQuery } from '@apollo/client';
import Navbar from "../Navbar";
import Reviews from "./Reviews/Reviews";
import SimilarGames from "./SimilarGames";
import GameInfo from './GameInfo';

const GET_GAME = gql`
    query Game($url: String!) {
        gameByUrl(url: $url) {
            _id
            coverImage
            description
            developer
            platform
            price
            publisher
            releaseDate
            title
            url
            reviews {
              _id
              rating
            }
            categories {
              _id
            }
        }
    }
`;

export default function Component() {
    const { url } = useParams();
    const { loading, error, data } = useQuery(GET_GAME, {
        variables: { url }
    });

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) {
        console.error('Error fetching data:', error); 
        return <p className="text-white">An error occurred</p>;
    }

    const game: any = data.gameByUrl;
    const categories: [string] = data?.gameByUrl.categories;
    
    return (
      <>
        <Navbar />
        {game && <GameInfo game={game} />}
        {url && <Reviews url={url} />}
        {categories && url && <SimilarGames categories={categories} url={url} />}
      </>
    );
};
