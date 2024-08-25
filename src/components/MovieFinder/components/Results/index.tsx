import { MIN_CHAR_COUNT } from '../../../../apis/constants'
import { MoviePreview } from '../../../../apis/movies'
import Loader from '../../../Loader'
import Movie from '../Movie'
import NoResults from '../NoResults'

import styles from './index.module.scss'

interface ResultsProps {
  searchTerm: string
  selectedGenre: string
  movies: MoviePreview[]
  totalMovieCount: number
  isLoading: boolean
}

export const HighlightedText = ({ children }: { children: string | number }) => (
  <strong className="text-orange-400">{children}</strong>
)

const Results = ({ searchTerm, movies, selectedGenre, totalMovieCount, isLoading }: ResultsProps) => {
  const noResults = !isLoading && movies.length === 0

  return (
    <div className={styles.movieFinder__content}>
      {noResults && searchTerm.length < MIN_CHAR_COUNT && (
        <NoResults>
          Search our database of <HighlightedText>{totalMovieCount ? totalMovieCount : ''}</HighlightedText>{' '}
          movies
        </NoResults>
      )}

      {noResults && searchTerm.length >= MIN_CHAR_COUNT && (
        <NoResults>
          No movies found that match <HighlightedText>{searchTerm}</HighlightedText>{' '}
          {selectedGenre ? `and have a genre of` : ''}{' '}
          {selectedGenre && <HighlightedText>{selectedGenre}</HighlightedText>}
        </NoResults>
      )}

      {movies.map(movie => (
        <Movie key={movie.id} {...movie} />
      ))}

      {isLoading && <Loader />}
    </div>
  )
}

export default Results
