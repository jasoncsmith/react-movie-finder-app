import { BASE_URL, MIN_CHAR_COUNT } from './constants'

export type Rating =
  | 'G'
  | 'PG'
  | 'PG-13'
  | '13+'
  | '14'
  | '14+'
  | '14A'
  | '16+'
  | '18A'
  | '18+'
  | 'R'
  | 'PA'
  | 'A'
  | 'AA'
  | 'TV-MA'
  | 'TV-14'
  | 'Approved'
  | 'Passed'
  | 'Not Rated'
  | '(Banned)'

export interface MoviePreview {
  id: string
  title: string
  posterUrl: string
  rating: Rating | undefined
}

export interface MovieDetail extends MoviePreview {
  summary: string
  duration: string
  directors: string[]
  mainActors: string[]
  datePublished: Date
  ratingValue: number
  bestRating: number
  worstRating: number
  writers: string[]
  genres: { id: string; title: string }[]
}

interface ResponseMoviePreview {
  data: MoviePreview[]
  totalPages: number
}

export async function getTotalNumberOfMovies(): Promise<number | null> {
  const token = window.localStorage.getItem('authToken')

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${BASE_URL}/movies?limit=1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const json = await response.json()
    return json?.totalPages
  } catch (err) {
    throw new Error('Error searching movies' + err)
  }
}

export async function getMovies(
  searchTerm: string = '',
  genre: string = '',
  page: string = '1',
  limit: number = 6
): Promise<ResponseMoviePreview | null> {
  const token = window.localStorage.getItem('authToken')

  if (genre === '' && searchTerm.trim().length < MIN_CHAR_COUNT) {
    return null
  }

  if (!token) {
    return null
  }

  try {
    const response = await fetch(
      `${BASE_URL}/movies?search=${searchTerm}&genre=${genre}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return await response.json()
  } catch (err) {
    throw new Error('Error searching movies' + err)
  }
}

export async function getMovie(id: string): Promise<MovieDetail | null> {
  const token = window.localStorage.getItem('authToken')

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!`${response.status}`.startsWith('2')) {
      return null
    }

    return await response.json()
  } catch (err) {
    throw new Error('Error searching movies' + err)
  }
}
