import { useQuery, gql } from "@apollo/client"
import GameCard from "./GameCard"

const FETCH_NEW_GAMES = gql`
    query Games($offset: Int!, $limit: Int!, $newest: Boolean) {
        games(offset: $offset, limit: $limit, newest: $newest) {
            title
            url
            _id
            coverImage
        }
    }
`

const LIMIT = 8;

const NewGames = () => {
    const {loading, error, data} = useQuery(FETCH_NEW_GAMES, {
        variables: {
            offset: 0, 
            limit: LIMIT,
            newest: true
        }
    })
    const games = data?.games || [];
    if (loading) return <div className="text-white">Loading...</div>
    if (error) return <div className="text-white">Error: {error.message}</div>

    return <div id="products" className="px-10 bg-black" style={{"fontFamily": "Allerta, sans-serif"}}>
            <div className="grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8 xl:gap-x-8">
                {games && games.map((game: any) => <GameCard key={game._id} link={`games/${game.url}`} {...game} />)}
            </div>
        </div>
}

export default NewGames;