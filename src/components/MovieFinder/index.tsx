import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useMovieFetcher } from '../../hooks/useMovieFetcher'
import { pluralize } from '../../utils'

import Results from './components/Results'
import Pagination from './components/Pagination'
import Search from './components/Search'
import GenreSelector from './components/GenreSelector'

import styles from './index.module.scss'

const Controls = ({ children }: { children: ReactNode }) => <div className="grid grid-cols-2">{children}</div>

const MovieFinder = () => {
  const {
    totalMovieCount,
    totalPages,
    movies,
    allGenres,
    searchParam,
    genreParam,
    searchParams,
    estimatedSearchResultCount,
    isLoading,
  } = useMovieFetcher()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setGenre] = useState('')
  const [, setSearchParams] = useSearchParams()

  useEffect(() => {
    // populate controls on page load if defined in url
    setSearchTerm(searchParam)
    setGenre(genreParam)
  }, [searchParam, genreParam])

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    const val = e.target.value
    const genre = searchParams.get('genre') ?? ''

    setSearchTerm(val)
    setSearchParams({ search: val, page: '1', genre }, { replace: true })
  }

  function handleGenreChange(e: ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value
    const search = searchParams.get('search') ?? ''

    setGenre(val)
    setSearchParams({ genre: val, page: '1', search }, { replace: true })
  }

  /*
    searchTerm
    allGenres
    totalPages
    movies
    page
    limit

   
   */

  return (
    <div className={styles.movieFinder}>
      <Controls>
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <GenreSelector allGenres={allGenres} onChange={handleGenreChange} selectedGenre={selectedGenre} />
      </Controls>
      <span className={`uppercase ${!movies.length ? 'invisible' : ''}`}>
        {estimatedSearchResultCount} Movie{pluralize(estimatedSearchResultCount)} Found
      </span>
      <Pagination totalPages={totalPages} numResults={movies.length} />
      <Results
        searchTerm={searchTerm}
        selectedGenre={selectedGenre}
        movies={movies}
        totalMovieCount={totalMovieCount}
        isLoading={isLoading}
      />
    </div>
  )
}

export default MovieFinder
