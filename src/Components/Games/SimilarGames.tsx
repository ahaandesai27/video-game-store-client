import { useQuery, gql } from "@apollo/client"
import React from "react"
import GameCard from "./GameCard"

type Props = {
    categories: [string]
    url: string
}

const FETCH_SIMILAR_GAMES = gql`
    query SimilarGames($categories: [ID!]!, $offset: Int!, $limit: Int!) {
        gamesByCategory(categories: $categories, offset: $offset, limit: $limit) {
            title
            url
            _id
            coverImage
        }
    }
`

const LIMIT = 6;

const SimilarGames: React.FC<Props> = ({categories, url}) => {

    const {loading, error, data} = useQuery(FETCH_SIMILAR_GAMES, {
        variables: {categories: categories ? categories.map((category: any) => category._id) : [],
            offset: 0, 
            limit: LIMIT
        }
    })
    const games = data?.gamesByCategory || [];

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>


    //Fetch similar games based on categories
    return <div id="products" className="px-20 bg-black">
            {games.length !== 0 && <div className="text-4xl m-2 text-white font-bold">Similar games</div>}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 xl:gap-x-8">
                {games && games.map((game: any) => {
                        if (game.url != url) {
                            return <GameCard key={game._id} {...game} />
                        }
                    }
                )}
            </div>
        </div>
}

export default SimilarGames;