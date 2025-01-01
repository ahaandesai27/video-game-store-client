import { useState } from "react";

interface Game {
    _id: string;
    title: string;
    url: string;
    price: number;
    coverImage: string;
    link: string;
}

const GameRowCard = ({_id, url, title, coverImage, price, link = ""}: Game) => {
    const [src, setSrc] = useState(coverImage);
    const handleImageError = () => {
        setSrc("https://static.vecteezy.com/system/resources/thumbnails/001/826/199/small_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg");
    }
    return <a key={_id} href={link ? link : "games/" + url} className="group">
        <div className="flex gap-4">
            <img
                alt={url}
                src={src}
                onError={handleImageError}
                style={{"height": "250px", "width": "187.5px"}}
            />
            <div>
                <h3 className="mt-4 text-sm text-blue">{title}</h3>
                <p className="mt-1 text-lg font-medium text-white">
                    {price != 0 ? `${price}$` : "Free"}
                </p>
            </div>
        </div>
    </a>
}

export default GameRowCard;