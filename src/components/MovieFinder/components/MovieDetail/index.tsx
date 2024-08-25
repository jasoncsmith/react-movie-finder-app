import { useNavigate, useParams } from 'react-router-dom'

import { transformDate, transformDuration } from '../../../../utils'
import { useMovieFetcher } from '../../../../hooks/useMovieFetcher'

import { MovieRating } from '../MovieRating'
import Loader from '../../../Loader'
import NoResults from '../NoResults'
import { MovieImage } from '../Movie'

import styles from './index.module.scss'

const MovieDetail = () => {
  const { id: movieId } = useParams()
  const { movie, isLoading } = useMovieFetcher(movieId)
  const navigate = useNavigate()

  if (isLoading) return <Loader />

  if (!movie)
    return (
      <div className="componentWrap">
        <button type="button" onClick={() => navigate('/')} title="Return to Home Page">
          Home
        </button>
        <NoResults>Movie Not Found</NoResults>
      </div>
    )

  const { posterUrl, summary, title, rating, ratingValue, datePublished, duration, genres } = movie

  return (
    <div className={styles.componentWrap}>
      <button
        type="button"
        onClick={() => {
          navigate(-1)
        }}
        title="Back"
      >
        Back
      </button>

      <div className={styles.movieDetail}>
        <div className={styles.movieDetail__imageContainer}>
          <MovieImage url={posterUrl} title={title} />
        </div>

        <div className={styles.movieDetail__content}>
          <MovieRating rating={rating} />
          <h2 className="text-4xl font-bold mb-4 md:pr-[150px]">{title}</h2>
          <div>
            {ratingValue !== undefined &&
              Array(10)
                .fill('')
                .map((_, idx) => <span key={idx}>{idx + 1 <= Math.floor(ratingValue) ? '⭐' : '⚫'}</span>)}
            <span className="pl-4">({ratingValue})</span>
          </div>
          <div className="py-4 text-gray-400">
            <span>{transformDate(datePublished)}</span>
            <span className="px-2">◽</span>
            <span>{transformDuration(duration)}</span>
            <span className="px-2">◽</span>
            <span>{genres.map(g => g.title).join(', ')}</span>
          </div>
          <p className="text-2xl">{summary}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
