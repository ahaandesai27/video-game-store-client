import { gql, useQuery } from "@apollo/client";
import React from "react";
import Review from './Review';
import PostReview from "./PostReview";

type ReviewProps = {
    url: string;
}
const GET_GAME_ID = gql`
    query Game($url: String!) {
        gameByUrl(url: $url) {
            _id
        }
    }
`

const REVIEWS_BY_GAME = gql`
    query reviews($game: ID!, $offset: Int!, $limit: Int!) {
        reviewsByGame(game: $game, offset: $offset, limit: $limit) {
            _id
            review
            rating
            user {
                username
            }
            date
        }
    }
`
const LIMIT = 3;
const Reviews: React.FC<ReviewProps> = ({url}) =>  {
    const {loading: idLoading, error: idError, data: id} = useQuery(GET_GAME_ID, {
        variables: {
            url,
        }
    });

    if (idLoading) return <p className="text-white">Loading...</p>;
    if (idError) {
        console.error('Error fetching data:', idError); // Log the error for debugging
        return <p className="text-white">An error occurred</p>;
    }
    const gameId: string = id.gameByUrl._id;

    const {loading: reviewsLoading, error: reviewsError, data: reviewsData, fetchMore} = useQuery(REVIEWS_BY_GAME, {
        variables: {
            game: gameId,
            offset: 0,
            limit: LIMIT
        }
    });

    const reviews = reviewsData?.reviewsByGame;
    console.log(reviews)

    const getMore = () => {
        fetchMore({
            variables: {
                offset: reviews.length, // Adjust the offset logic
                limit: LIMIT
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    ...prev,
                    reviewsByGame: [...prev.reviewsByGame, ...fetchMoreResult.reviewsByGame]
                };
            }
        });
    }
    if (reviewsLoading) return <p className="text-white">Loading...</p>;
    if (reviewsError) {
        console.error('Error fetching data:', reviewsError); // Log the error for debugging
        return <p className="text-white">An error occurred</p>;
    }

    return (
        <div className="lg:px-20 bg-black" id="reviews">
            <div className="text-white text-2xl font-semibold">Reviews</div>
            <PostReview gameUrl={url}/>
            {
                reviews && reviews.map((review: any) => {
                    return <Review key={review._id} review={review} />
                })
            }
            <div className="text-center"><button onClick={getMore}>More Reviews</button></div>
        </div>
    )


}

export default Reviews;