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

const Results = ({ searchTerm, movies, selectedGenre, totalMovieCount, isLoading }: ResultsProps) => (
  <div className={styles.movieFinder__content}>
    {searchTerm.length < MIN_CHAR_COUNT && movies.length === 0 && (
      <NoResults>
        <div>
          Search our database of <strong>{totalMovieCount ? totalMovieCount : ''}</strong> movies
        </div>
      </NoResults>
    )}

    {searchTerm.length >= MIN_CHAR_COUNT && movies.length === 0 && (
      <NoResults>
        No movies found that match <strong>{searchTerm}</strong> {selectedGenre ? `and ${selectedGenre}` : ''}
      </NoResults>
    )}

    {movies.length > 0 && movies.map(movie => <Movie key={movie.id} {...movie} />)}

    {isLoading && <Loader />}
  </div>
)

export default Results
