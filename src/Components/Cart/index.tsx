import {gql, useQuery} from "@apollo/client"
import { useUser } from '../../context/UserContext.tsx';
import Navbar from "../Navbar.tsx";
import CartElement from "./CartElement.tsx";

const GET_USER_CART= gql`
    query UserCart ($userId: ID!) {
        user(_id: $userId) {
            cart {
                title
                url
                coverImage
                _id
            }
        }
    }
`

export default function Library() {
    const {userId} = useUser();
    if (!userId) return <div className="text-4xl font-bold p-5 text-white px-16"> Please login to view your cart! </div>

    const { loading, error, data } = useQuery(GET_USER_CART, {
        variables: { userId: userId }
    })

    const games = data?.user.cart || [];

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!games.length) return <> <Navbar /> <div className="text-4xl font-bold p-5 text-white px-16"> No games in your cart </div> </>
    
    return <div style={{"fontFamily": "Allerta, sans-serif"}}>
        <Navbar />
        <div className="text-4xl font-bold p-5 text-white px-16"> Your Cart</div>
        <div className="px-12">
            {games.map((game: any) => (
                <div key={game._id} className="mb-4"> {/* Adds margin-bottom for spacing */}
                    <CartElement game={game} />
                </div>
            ))}
        </div>
    </div>
}