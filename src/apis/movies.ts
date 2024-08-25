import { BASE_URL, DEFAULT_LIMIT, MIN_CHAR_COUNT } from './constants'

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
  duration: string | undefined
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
  const token = window.localStorage.getItem('mf:authToken')

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

export async function getMovies({
  search = '',
  genre = '',
  page = '1',
  limit = DEFAULT_LIMIT,
}: {
  search: string
  genre: string
  page: string
  limit: number
}): Promise<ResponseMoviePreview | null> {
  const token = window.localStorage.getItem('mf:authToken')

  if (genre === '' && search.trim().length < MIN_CHAR_COUNT) {
    return null
  }

  if (!token) {
    return null
  }

  try {
    const response = await fetch(
      `${BASE_URL}/movies?search=${search}&genre=${genre}&page=${page}&limit=${limit}`,
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

export async function getMovie(id: string | undefined): Promise<MovieDetail | null> {
  const token = window.localStorage.getItem('mf:authToken')

  if (!token || !id) {
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
