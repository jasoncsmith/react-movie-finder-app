import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { getGenres, GenreModel } from '../apis/genres'
import { getTotalNumberOfMovies, getMovies, MoviePreview } from '../apis/movies'

export const useMovieFetcher = () => {
  const location = useLocation()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])

  const pageParam = searchParams.get('page') ?? '1'
  const genreParam = searchParams.get('genre') ?? ''
  const searchParam = searchParams.get('search') ?? ''

  const { data: genres } = useQuery({
    queryKey: ['all-genres'],
    queryFn: getGenres,
  })
  const { data: allMovies } = useQuery({
    queryKey: ['total-movie-count'],
    queryFn: getTotalNumberOfMovies,
  })
  const { data: movieResponse } = useQuery({
    queryKey: ['movies', searchParam, pageParam, genreParam],
    queryFn: () => getMovies({ search: searchParam, page: pageParam, genre: genreParam }),
  })

  const totalPages = movieResponse?.totalPages ?? 0
  const totalMovieCount = allMovies ?? 0
  const movies: MoviePreview[] = movieResponse?.data ?? []
  const allGenres: GenreModel[] = genres?.data ?? []

  return { totalMovieCount, totalPages, movies, allGenres, searchParam, genreParam, searchParams }
}
