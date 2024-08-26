import { ChangeEvent } from 'react'
import { useMovieFetcher } from '../../../../hooks/useMovieFetcher'
import { useSearchParams } from 'react-router-dom'
import { ACTION_TYPES, useMovieFinderContext } from '../../../../hooks/useMovieFinderApiContext'

const GenreSelector = () => {
  const { searchParams, allGenres } = useMovieFetcher()
  const { dispatch, selectedGenre } = useMovieFinderContext()
  const [, setSearchParams] = useSearchParams()

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value

    searchParams.set('genre', val)
    searchParams.set('page', '1') // reset pagination
    setSearchParams(searchParams, { replace: true })
    dispatch({ type: ACTION_TYPES.genre, payload: val })
  }

  return (
    <select
      className="w-full px-4 py-[18px] text-lg border border-slate-600 border-solid cursor-pointer"
      onChange={handleChange}
      value={selectedGenre}
    >
      <option value={''}>Select Genre</option>

      {allGenres.map(item => (
        <option key={item.id} value={item.title}>
          {item.title}
        </option>
      ))}
    </select>
  )
}

export default GenreSelector
