import { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ACTION_TYPES, useMovieFinderContext } from '../../../../hooks/useMovieFinderApiContext'
import { useMovieFetcher } from '../../../../hooks/useMovieFetcher'

const Search = () => {
  const { searchParams } = useMovieFetcher()
  const { dispatch, searchTerm } = useMovieFinderContext()
  const [, setSearchParams] = useSearchParams()

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value

    searchParams.set('search', val)
    searchParams.set('page', '1') // reset pagination
    setSearchParams(searchParams, { replace: true })
    dispatch({ type: ACTION_TYPES.search, payload: val })
  }

  return (
    <input
      className="p-4 text-lg leading-1 w-full border border-slate-600 border-solid"
      placeholder={'Search Movies'}
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  )
}

export default Search
