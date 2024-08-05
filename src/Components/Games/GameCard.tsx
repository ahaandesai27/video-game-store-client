interface Game {
    _id: string;
    title: string;
    url: string;
    price: number;
    coverImage: string;
}

const GameCard = ({_id, url, title, coverImage, price}: Game) => {
    return <a key={_id} href={"games/" + url} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
                alt={title}
                src={coverImage}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
        </div>
        <h3 className="mt-4 text-sm text-white">{title}</h3>
        {price !== 0 ? <p className="mt-1 text-lg font-medium text-white">{price}$</p> : <p className="mt-1 text-lg font-medium text-white">Free</p>}
    </a>
}

export default GameCard;