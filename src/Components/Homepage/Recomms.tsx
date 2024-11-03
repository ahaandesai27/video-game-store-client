import { useQuery, gql } from "@apollo/client"
import GameCard from "./GameCard"
import { useUser } from '../../context/UserContext';

const RECOMMEND_GAMES = gql`
    query SimilarGames($categories: [ID!]!, $offset: Int!, $limit: Int!) {
        gamesByCategory(categories: $categories, offset: $offset, limit: $limit) {
            title
            url
            _id
            coverImage
        }
    }
`

const LIMIT = 8;

const NewGames = () => {
    const { userPreferences} = useUser();
    const {loading, error, data} = useQuery(RECOMMEND_GAMES, {
        variables: {
            skip: !userPreferences,
            categories: userPreferences,
            offset: 0, 
            limit: LIMIT
        }
    })

    // This part is common
    const games = data?.gamesByCategory || [];
    if (loading) return <div className="text-white">Loading...</div>
    if (error) return <div className="text-white">Error: {error.message}</div>

    return <div id="products" className="px-10 bg-black">
            <div className="grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8 xl:gap-x-8">
                {games && games.map((game: any) => <GameCard key={game._id} link={`games/${game.url}`} {...game} />)}
            </div>
        </div>
}

export default NewGames;