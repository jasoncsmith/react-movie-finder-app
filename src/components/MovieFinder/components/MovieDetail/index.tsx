import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovie, MovieDetail as MovieDetailProps } from '../../../../apis/movies'
import { MovieRating } from '../Movie'
import Loader from '../../../Loader'
import NoResults from '../NoResults'

import styles from './index.module.scss'

const NoImage = () => (
  <div className="text-xl w-full h-full flex justify-center items-center">
    <p>No Image Available</p>
  </div>
)

const pluralize = (str: string) => {
  const val = +str
  return val === 1 ? '' : 's'
}

const transformDuration = (duration: string) => {
  const parts = duration.replace('PT', '').replace('M', '').split('H')
  return `${parts[0]} Hour${pluralize(parts[0])} ${parts[1]} Minute${pluralize(parts[1])}`
}

const transformDate = (dateString: Date) => {
  const date = new Date(dateString + 'T00:00:00Z')
  console.log(dateString)
  return `
    ${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCDate()).padStart(
    2,
    '0'
  )}/${date.getUTCFullYear()}`
}

const MovieDetail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<MovieDetailProps | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }

    setIsLoading(true)
    getMovie(id)
      .then(movie => setMovie(movie))
      .catch(() => setMovie(null))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) return <Loader />

  if (!movie)
    return (
      <>
        <button
          type="button"
          onClick={() => {
            navigate('/')
          }}
        >
          Home
        </button>
        <NoResults>Movie Not Found</NoResults>
      </>
    )

  const { posterUrl, summary, title, rating, ratingValue, datePublished, duration, genres } = movie
  return (
    <div className={styles.componentWrap}>
      <button
        type="button"
        onClick={() => {
          navigate(-1)
        }}
      >
        Back
      </button>

      <div className={styles.movieDetail}>
        <div className={styles.movieDetail__imageContainer}>
          {posterUrl ? (
            <img className="w-full object-contain" src={`${posterUrl}`} alt={title} />
          ) : (
            <NoImage />
          )}
        </div>

        <div className={styles.movieDetail__content}>
          <h2 className="text-4xl font-bold mb-4 pr-[100px]">{title}</h2>
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
          <MovieRating rating={rating} />
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
