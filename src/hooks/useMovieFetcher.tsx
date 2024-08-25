import { useEffect, useMemo, useState } from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import { getGenres, GenreModel } from '../apis/genres'
import { getTotalNumberOfMovies, getMovies, MoviePreview, getMovie } from '../apis/movies'
import { DEFAULT_LIMIT } from '../apis/constants'
import { getAuth } from '../apis/auth'

export const useMovieFetcher = (movieId?: string) => {
  const token = window.localStorage.getItem('mf:authToken')
  const [isLoadingToken, setIsLoadingToken] = useState(false)
  const location = useLocation()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])

  const pageParam = searchParams.get('page') ?? '1'
  const genreParam = searchParams.get('genre') ?? ''
  const searchParam = searchParams.get('search') ?? ''
  const limit = DEFAULT_LIMIT // TODO: make user configurable

  const { data: genres } = useQuery({
    queryKey: ['all-genres'],
    queryFn: getGenres,
  })
  const { data: allMovies } = useQuery({
    queryKey: ['total-movie-count'],
    queryFn: getTotalNumberOfMovies,
  })
  const {
    data: movieResponse,
    isPlaceholderData: isLoadingMovies, // will act as the loading state with keepPreviousData on
  } = useQuery({
    queryKey: ['movies', searchParam, pageParam, genreParam],
    queryFn: () => getMovies({ search: searchParam, page: pageParam, genre: genreParam, limit }),
    placeholderData: keepPreviousData,
  })
  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovie(movieId),
  })

  const totalPages = movieResponse?.totalPages ?? 0
  const totalMovieCount = allMovies ?? 0
  const movies: MoviePreview[] = movieResponse?.data ?? []
  const allGenres: GenreModel[] = genres?.data ?? []
  const estimatedSearchResultCount = totalPages > 1 ? `${(totalPages - 1) * limit}+` : `${movies.length}`

  useEffect(() => {
    if (token) return
    setIsLoadingToken(true)
    getAuth().finally(() => setIsLoadingToken(false))
  }, [token])

  return {
    totalMovieCount,
    totalPages,
    movies,
    allGenres,
    searchParam,
    genreParam,
    searchParams,
    movie,
    estimatedSearchResultCount,
    isLoading: isLoadingMovie || isLoadingMovies || isLoadingToken,
  }
}
