import { useNavigate } from "react-router";

type Review = {
    _id: string;
    rating: number;
  };
type Category = {
    _id: string;
  };
type Game = {
    _id: string;
    coverImage: string;
    description: string;
    developer: string;
    platform: string[];
    price: number;
    publisher: string;
    releaseDate: string;
    title: string;
    url: string;
    reviews: Review[];
    categories: Category[];
  };
type Props = {
    game: Game
}

const Component = ({game}: Props) => {
    const averageReview = game?.reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / game.reviews.length | 0;
    const date = new Date(game.releaseDate);
    const navigate = useNavigate();

    // Extracting month, day, and year
    const options: any = { month: 'long', day: 'numeric', year: '2-digit' };
    const dateString: any = date.toLocaleDateString('en-US', options);

    const checkOut = () => {
      const { _id, price, title } = game;
      const gameData = { _id, price, title };
      console.log(gameData)
      navigate(`/games/${game.url}/buy`, { state: gameData });
    };

    const addGame = () => {
      console.log("game added !! :) ")
    }
    
    return <section className="py-8 bg-white md:py-16 dark:bg-black antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-16">
              <div className="max-w-md lg:max-w-lg mx-auto" id="Image">
                {/* Game Image*/}
                <img className="w-full hidden dark:block" src={game.coverImage} alt="" />
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-0 lg:col-span-2" id="Info">
                {/* Game Info*/}
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-4xl dark:text-white">{game.title}</h1>    
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">                     
                  {game.price === 0 ? <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">Free</p> : <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">${game.price}</p>}
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {/* average and number of reviews and stars*/}
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(averageReview))].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">({averageReview ? averageReview.toFixed(1) : 0})</p>
                    <a href="#reviews" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">{game.reviews.length} Reviews</a>
                  </div>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button onClick={game.price == 0 ? addGame : checkOut} title="" className="flex items-center justify-center px-8 py-3 rounded-lg bg-purple-500 text-white hover:bg-purple-300" role="button">
                    <div className="font-extrabold"></div>{game.price == 0 ? "Add to Library" : "Buy Now"}
                  </button>
                  <button onClick={() => {}} title="" className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center" role="button">
                    <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
                    </svg>
                    Add to cart
                  </button>
                </div>
                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <div className="flex">
                  <div className="w-1/2"><p className="mb-6 text-gray-500 dark:text-gray-400">{game.description}</p></div>
                  <div className="w-1/2">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Details</h2>
                      <table className="table-auto w-full mt-4 text-gray-400">
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 font-semibold text-white">Developer:</td>
                            <td className="py-2">{game.developer}</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 font-semibold text-white">Publisher:</td>
                            <td className="py-2">{game.publisher}</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="py-2 font-semibold text-white">Platforms:</td>
                            <td className="py-2">
                              {game.platform.map((g, index) => (
                                <span key={index} className="mr-2">{g}{index < game.platform.length - 1 && ','}</span>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold text-white">Release Date:</td>
                            <td className="py-2">{dateString}</td>
                          </tr>
                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
}

export default Component;