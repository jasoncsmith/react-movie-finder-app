import { Link } from 'react-router-dom'
import { MoviePreview } from '../../../../apis/movies'
import { MovieRating } from '../MovieRating'
import NoImage from '../NoImage'

import styles from './index.module.scss'

const Movie = ({ id, title, posterUrl, rating }: MoviePreview) => {
  return (
    <Link to={`movies/${id}`} className={`${styles.movie} p-2 pb-6 bg-slate-900 hover:bg-slate-800`}>
      <div className="relative flex flex-col gap-4">
        <div className="h-[350px] w-full bg-slate-500 overflow-hidden">
          {posterUrl ? (
            <img className="w-full object-contain" src={`${posterUrl}`} alt={title} />
          ) : (
            <NoImage />
          )}
        </div>
        <MovieRating rating={rating} />
        <h2 className="text-2xl text-slate-400 px-4">{title}</h2>
      </div>
    </Link>
  )
}

export default Movie
