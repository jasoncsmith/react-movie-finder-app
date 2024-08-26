import { MIN_CHAR_COUNT } from '../../../../apis/constants'
import { useMovieFetcher } from '../../../../hooks/useMovieFetcher'
import { useMovieFinderContext } from '../../../../hooks/useMovieFinderApiContext'

import Loader from '../../../Loader'
import Movie from '../Movie'
import NoResults from '../NoResults'

import styles from './index.module.scss'

export const HighlightedText = ({ children }: { children: string | number }) => (
  <strong className="text-orange-400">{children}</strong>
)

const Results = () => {
  const { totalMovieCount, movies, isLoading } = useMovieFetcher()
  const { selectedGenre, searchTerm } = useMovieFinderContext()

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
