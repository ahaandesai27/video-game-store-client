import { gql, useQuery } from "@apollo/client";
import React from "react";
import Review from './Review';

type ReviewProps = {
    url: string;
}
const GET_REVIEW = gql`
    query Game($url: String!) {
        gameByUrl(url: $url) {
            reviews {
                date
                rating
                review
                user {
                    username
                }
            }
        }
    }
`

const Reviews: React.FC<ReviewProps> = ({url}) =>  {
    const {loading, error, data} = useQuery(GET_REVIEW, {
        variables: {
            url
        }
    });

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return <p className="text-white">An error occurred</p>;
    }
    console.log(data.gameByUrl.reviews);
    return (
        <div>
            <div className="text-white text-2xl font-semibold px-20">Reviews</div>
            {
                data.gameByUrl.reviews.map((review: any, index: number) => {
                    return <div className="px-20"><Review key={index} review={review} /></div>
                })
            }
        </div>
    )


}


export default Reviews;