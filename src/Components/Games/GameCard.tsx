import { useState } from "react";

interface Game {
    _id: string;
    title: string;
    url: string;
    price: number;
    coverImage: string;
}

const GameCard = ({_id, url, title, coverImage, price}: Game) => {
    const [src, setSrc] = useState(coverImage);

    const handleImageError = () => {
        setSrc("https://static.vecteezy.com/system/resources/thumbnails/001/826/199/small_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg");
    }
    return <a key={_id} href={"games/" + url} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
                alt={url}
                src={src}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                onError={handleImageError}
            />
        </div>
        <h3 className="mt-4 text-sm text-white">{title}</h3>
        {price !== undefined && price !== null && price !== 0 && (
            <p className="mt-1 text-lg font-medium text-white">
                {price ? `${price}$` : "Free"}
            </p>
        )}
    </a>
}

export default GameCard;