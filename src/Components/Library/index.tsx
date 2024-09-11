import Navbar from "../Navbar";
import { gql, useQuery } from '@apollo/client';

//Todo - Implement pagination

const GET_USER_GAMES = gql`
    query UserGames ($userId: ID!) {
        user(_id: $userId) {
            ownedGames {
                title
                url
                coverImage
                _id
            }
        }
    }
`

const GameBar = ({ game }: any) => {
    const neturl: string = `/games/${game.url}`
    return (
        <div className="p-1">
            <a
                className="flex items-center p-2"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.065)', // Semi-transparent white
                    backdropFilter: 'blur(10px)', // Frosted glass blur effect
                    WebkitBackdropFilter: 'blur(10px)', // For Safari support
                    borderRadius: '0.5rem',
                }}
                href={neturl}
            >
                <img src={game.coverImage} alt={game.title} className="w-20 h-24 mr-4" />
                <div className="text-white">{game.title}</div>
            </a>
        </div>
    );
};


export default function Library() {
    const { loading, error, data } = useQuery(GET_USER_GAMES, {
        variables: { userId: "66b0b3cfe2ebd5caf916c0e4" }
    })
    const games = data?.user.ownedGames || [];
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return <>
        <Navbar />
        <div className="text-4xl font-bold p-5 text-white px-16"> Your Library</div>
        <div className="px-12">
            {games.map((game: any) => <GameBar game={game} key={game._id} />)}
        </div>
    </>
}