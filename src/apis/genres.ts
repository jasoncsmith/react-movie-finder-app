import { BASE_URL } from './constants.ts'

export interface GenreModel {
  id: string
  title: string
  movies: { id: string }[]
}

interface ResponseGenres {
  data: GenreModel[]
}

export async function getGenres(): Promise<ResponseGenres | null> {
  const token = window.localStorage.getItem('mf:authToken')

  if (!token) {
    return null
  }

  try {
    const response = await fetch(`${BASE_URL}/genres/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return await response.json()
  } catch (err) {
    throw new Error('Error searching movies' + err)
  }
}
