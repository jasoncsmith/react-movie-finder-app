import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { getMovies, getTotalNumberOfMovies, MoviePreview } from '../../apis/movies'
import { GenreModel, getGenres } from '../../apis/genres'
import { getAuth } from '../../apis/auth'
import { MIN_CHAR_COUNT } from '../../apis/constants'
import Results from './components/Results'
import Pagination from './components/Pagination'
import Search from './components/Search'
import GenreSelector from './components/GenreSelector'

import styles from './index.module.scss'

const Controls = ({ children }: { children: ReactNode }) => <div className="grid grid-cols-2">{children}</div>

const MovieFinder = () => {
  const [movies, setData] = useState<MoviePreview[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [totalMovieCount, setTotalMovieCount] = useState(0)
  const [genres, setGenres] = useState<GenreModel[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setGenre] = useState('')
  const location = useLocation()
  const [, setSearchParams] = useSearchParams()

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const cachedGenres = useMemo(() => genres, [genres.length])

  useEffect(() => {
    setIsLoading(true)
    getAuth().finally(() => setIsLoading(false))
    getTotalNumberOfMovies().then(count => setTotalMovieCount(count ?? 0))
    getGenres().then(rsp => setGenres(rsp?.data ?? []))
  }, [])

  useEffect(() => {
    const searchTerm = searchParams.get('search') ?? ''
    const page = searchParams.get('page') ?? '1'
    const genre = searchParams.get('genre') ?? ''

    if (genre === '' && searchTerm.trim().length < MIN_CHAR_COUNT) {
      setData([])
      setTotalPages(0)
      return
    }

    setIsLoading(true)
    setSearchTerm(searchTerm)
    setGenre(genre)

    getMovies(searchTerm, genre, page)
      .then(rsp => {
        setTotalPages(rsp?.totalPages ?? 0)
        setData(rsp?.data ?? [])
      })
      .finally(() => setIsLoading(false))
  }, [searchParams])

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
      <Controls>
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <GenreSelector allGenres={cachedGenres} onChange={handleGenreChange} selectedGenre={selectedGenre} />
      </Controls>
      <span> {totalPages > 1 ? `${(totalPages - 1) * 6}+` : `${movies.length}`} MOVIES FOUND</span>
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
