import { Link } from 'react-router-dom'
import { MoviePreview } from '../../../../apis/movies'
import { MovieRating } from '../MovieRating'
import NoImage from '../NoImage'

import styles from './index.module.scss'

export const MovieImage = ({ url, title }: { url: string; title: string }) => {
  return url ? <img className="w-full object-contain" src={`${url}`} alt={title} /> : <NoImage />
}

const Movie = ({ id, title, posterUrl, rating }: MoviePreview) => {
  return (
    <Link to={`movies/${id}`} className={`${styles.movie} p-2 pb-6 bg-slate-900 hover:bg-slate-800`}>
      <div className="relative flex flex-col gap-4">
        <div className="h-[350px] w-full bg-slate-800 overflow-hidden">
          <MovieImage url={posterUrl} title={title} />
        </div>
        <MovieRating rating={rating} />
        <h2 className="text-2xl text-slate-400 px-4">{title}</h2>
      </div>
    </Link>
  )
}

export default Movie
