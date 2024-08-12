import { useParams } from "react-router"
import { gql, useQuery } from '@apollo/client';
import Navbar from "../Navbar";
import Reviews from "./Reviews/Reviews";
import SimilarGames from "./SimilarGames";

const GET_GAME = gql`
    query Game($url: String!) {
        gameByUrl(url: $url) {
            _id
            coverImage
            description
            developer
            platform
            price
            publisher
            releaseDate
            title
            url
            reviews {
              _id
              rating
            }
            categories {
              _id
            }
        }
    }
`

export default function Component() {
    const {url} = useParams();
    const {loading, error, data} = useQuery(GET_GAME, {
        variables: {
            url
        }
    });

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return <p className="text-white">An error occurred</p>;
    }

    const game = data.gameByUrl;
    const averageReview = game.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / game.reviews.length;
    return (
      <>
        <Navbar />
        <section className="py-8 bg-white md:py-16 dark:bg-black antialiased">

          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-16">

              <div className="max-w-md lg:max-w-lg mx-auto" id="Image">
                <img
                  className="w-full dark:hidden"
                  src={game.coverImage}
                  alt=""
                />
                <img
                  className="w-full hidden dark:block"
                  src={game.coverImage}
                  alt=""
                />
              </div>
    
              <div className="mt-6 sm:mt-8 lg:mt-0 lg:col-span-2" id="Info">
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-4xl dark:text-white">
                  {game.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  {game.price === 0 ? <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">Free</p> : <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">${game.price}</p>}
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1">
                      {[...Array(Math.floor(averageReview))].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      ({averageReview ? averageReview.toFixed(1) : 0})
                    </p>
                    <a
                      href="#reviews"
                      className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      {game.reviews.length} Reviews
                    </a>
                  </div>
                </div>
    
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    role="button"
                  >
                    <div
                      className="w-5 h-5 -ms-2 me-2"
>
                    </div>
                    Buy Now
                  </a>
    
                  <a
                    href="#"
                    title=""
                    className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                    role="button"
                  >
                    <svg
                      className="w-5 h-5 -ms-2 me-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                      />
                    </svg>
                    Add to cart
                  </a>
                </div>
    
                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
    
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {game.description}
                </p>
              </div>

            </div>
          </div>
        </section>
        {url && <Reviews url={url}/>}
        {data.gameByUrl.categories && url && <SimilarGames categories={data.gameByUrl.categories} url={url}/>}
      </>
      );
};  
