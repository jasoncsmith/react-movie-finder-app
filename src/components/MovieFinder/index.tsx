import { ChangeEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useMovieFetcher } from '../../hooks/useMovieFetcher'

import Results from './components/Results'
import Pagination from './components/Pagination'
import Search from './components/Search'
import GenreSelector from './components/GenreSelector'
import FlexTwoColumn from '../Layout/FlexTwoColumn'
import NumResultsDisplay from './components/NumResultsDisplay'

import styles from './index.module.scss'

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

  return (
    <div className={styles.movieFinder}>
      <FlexTwoColumn options="80/20">
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <GenreSelector allGenres={allGenres} onChange={handleGenreChange} selectedGenre={selectedGenre} />
      </FlexTwoColumn>
      <FlexTwoColumn options="50/50" className={styles.controls}>
        <NumResultsDisplay
          numMovies={movies.length}
          estimatedSearchResultCount={estimatedSearchResultCount}
        />
        <Pagination totalPages={totalPages} numResults={movies.length} />
      </FlexTwoColumn>
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
