type Props = {
    review: {
        date: string;
        rating: number;
        review: string;
        user: {
            username: string;
        };
    };
};

function formatDate(date: string): string {
    return date.slice(0, 10).split('-').reverse().join(' ');
}

function Review({ review }: Props) {
    return (
        <div className="p-4 border rounded-md shadow-md my-4 w-full">
            <p className="text-white text-sm mb-2">{formatDate(review.date)}</p>
            <p className="text-yellow-500 text-lg font-semibold mb-2">Rating: {review.rating} ★</p>
            <p className="text-white text-base mb-2">{review.review}</p>
            <p className="text-white text-sm font-medium">Reviewed by: {review.user.username}</p>
        </div>
    );
}

export default Review;
