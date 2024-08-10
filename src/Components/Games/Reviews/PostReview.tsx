import { FormEvent, useState, useRef, useEffect } from 'react';
import { useJwt } from 'react-jwt';
import { gql, useQuery, useMutation } from '@apollo/client';

type Props = {gameUrl: string };
type mutationProps = {review: string};
type formValues = {
    rating: number;
    review: string;
};

const POST_REVIEW = gql`
    mutation Review($review: AddReviewInput!) {
        addReview(review: $review) {
            review
        }
    }
`

const FETCH_GAME_URL = gql`
    query Query($url: String!) {
        gameByUrl(url: $url) {
            _id
    }
}
`

const PostReview = ({gameUrl}: Props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const {decodedToken, isExpired} = useJwt<any>(localStorage.getItem('token') || '');

    useEffect(() => {
        try {
            if (isExpired) {
                console.log('Token is expired');
                return;
            }
            if (decodedToken) {
                setUserId(decodedToken.userId);
            }
        } catch (error: any) {
            console.error('Error validating user:', error); // Log the error for debugging
        }
    }, [decodedToken, isExpired]);

    const {data} = useQuery(FETCH_GAME_URL, {
        variables: {
            url: gameUrl
        }
    });

    const [addReview] = useMutation<mutationProps>(POST_REVIEW);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isExpired) {
            console.log('Token is expired');
            alert("Must be logged in to post a review!");
            return;
        }

        setUserId(decodedToken?.userId);
        const gameId: string | null = data?.gameByUrl?._id;

        if (formRef.current) {
            const formData = new FormData(formRef.current);

            let formValues = Object.fromEntries(formData.entries()) as unknown as formValues;
            if (formValues.rating) {formValues.rating = parseInt(formValues.rating as unknown as string, 10);}
            const {rating, review} = formValues;
            console.log(rating, review, gameId, userId);
            console.log(userId);
            const data = await addReview({
                variables: {
                    review: {
                        game: gameId,
                        user: userId,
                        rating,
                        review
                    }
                }
            });

            if (data) {
                alert('Review submitted successfully!');
                formRef.current.reset();
                window.location.reload();
            }
            else {
                alert("An error occured");
            }
            
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-md my-4 w-full">
            <form onSubmit={handleSubmit} ref={formRef}>
                <div className="mb-4">
                    <label className="text-white text-sm mb-2 block">Rating:</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        name="rating"
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-white text-sm mb-2 block">Review:</label>
                    <textarea
                        rows={4}
                        name="review"
                        className="p-2 border rounded-md w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-yellow-500 text-black p-2 rounded-md hover:bg-blue-600"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default PostReview;
