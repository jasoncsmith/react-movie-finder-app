import { Link } from 'react-router-dom'
import { MoviePreview, Rating } from '../../../../apis/movies'
import NoImage from '../NoImage'

export const MovieRating = ({ rating }: { rating: Rating | undefined }) => (
  <p className="text-red-600 p-1 border-solid border-red-600 text-2xl inline-block font-bold absolute right-1 top-1 bg-white min-w-16 text-center">
    {rating ? rating : 'Not Rated'}
  </p>
)

const Movie = ({ id, title, posterUrl, rating }: MoviePreview) => {
  return (
    <Link to={`movies/${id}`} className="w-[calc(33.3333%-16px)] block p-2 bg-slate-900 hover:bg-slate-800 ">
      <div className="relative">
        <div className="h-[350px] w-full bg-slate-500 overflow-hidden">
          {posterUrl ? (
            <img className="w-full object-contain" src={`${posterUrl}`} alt={title} />
          ) : (
            <NoImage />
          )}
        </div>
        <MovieRating rating={rating} />
        <h2 className="text-2xl text-white py-4">{title}</h2>
      </div>
    </Link>
  )
}

export default Movie
