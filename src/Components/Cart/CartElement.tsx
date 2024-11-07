import {gql, useMutation} from "@apollo/client"
import { useUser } from '../../context/UserContext.tsx';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const REMOVE_GAME_FROM_CART = gql`
    mutation RemoveGameFromCart($userId: ID!, $gameId: ID!) {
        removeGameFromUserCart(userID: $userId, gameID: $gameId) {
            firstName
            lastName
        }
    }

`

export default function CartElement({ game }: any) {
    const neturl: string = `/games/${game.url}`
    const {userId} = useUser();
    const gameId = game._id;    
    
    const [removeGameFromUserCart] = useMutation(REMOVE_GAME_FROM_CART);
    const removeFromCart = async () => {
     try{
        const {data} = await removeGameFromUserCart({
            variables: {
                userId,
                gameId
            }
        })
        if (data) {
            alert("Game removed from cart");
        }
    } catch (error) {
        console.error("Error removing game from cart:", error);
        alert("Failed to remove game from cart");
    }
    }
    return (
        <div className="flex items-center p-2"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.065)', // Semi-transparent white
                backdropFilter: 'blur(10px)', // Frosted glass blur effect
                WebkitBackdropFilter: 'blur(10px)', // For Safari support
                borderRadius: '0.5rem',
            }}>
            <img src={game.coverImage} alt={game.title} className="w-24 h-30 mr-4" />
            <a href={neturl}>
                <div className="text-white">{game.title}</div>
            </a>
            <button className="ml-auto flex px-6" onClick={removeFromCart}>
                <RemoveCircleOutlineIcon className="mr-2" />
                <div className="text-red-600 font-bold">Remove</div>
            </button>
        </div>
    );
};
