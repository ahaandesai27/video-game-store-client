import Navbar from "../Navbar";
import { gql, useQuery } from '@apollo/client';
import { useUser } from "../../context/UserContext";
import LoadingPage from "../Utils/Loading";
import ErrorPage from "../Utils/Error";

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
        <div className="p-1" style={{"fontFamily": "Allerta, sans-serif"}}>
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
    const {userId} = useUser();
    if (!userId) return <div className="text-4xl font-bold p-5 text-white px-16"> Please login to view your games! </div>

    const { loading, error, data } = useQuery(GET_USER_GAMES, {
        variables: { userId: userId }
    })

    const games = data?.user.ownedGames || [];

    if (loading) return <LoadingPage />
    if (error) return <ErrorPage />
    if (!games.length) return <> <Navbar /> <div className="text-4xl font-bold p-5 text-white px-16"> No games in your library </div> </>
    
    return <>
        <Navbar />
        <div className="text-4xl font-bold p-5 text-white px-16"> Your Library</div>
        <div className="px-12">
            {games.map((game: any) => <GameBar game={game} key={game._id} />)}
        </div>
    </>
}