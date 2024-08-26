import { useSearchParams } from 'react-router-dom'
import { ACTION_TYPES, useMovieFinderContext } from '../../../../hooks/useMovieFinderApiContext'
import { useMovieFetcher } from '../../../../hooks/useMovieFetcher'
import { HighlightedText } from '../Results'

function keepInRange(newPage: number, totalPages: number) {
  // TODO: this logic should go in reducer
  return newPage < 1 ? 1 : newPage > totalPages ? totalPages : newPage
}

const Pagination = () => {
  const [, setSearchParams] = useSearchParams()
  const { totalPages, searchParams } = useMovieFetcher()
  const { dispatch, page } = useMovieFinderContext()

  function previous() {
    const newPage = `${keepInRange(+page - 1, totalPages)}`

    searchParams.set('page', newPage)
    setSearchParams(searchParams, { replace: true })
    dispatch({ type: ACTION_TYPES.paginate, payload: newPage })
  }

  function next() {
    const newPage = `${keepInRange(+page + 1, totalPages)}`

    searchParams.set('page', newPage)
    setSearchParams(searchParams, { replace: true })
    dispatch({ type: ACTION_TYPES.paginate, payload: newPage })
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center md:justify-end items-center">
      <div className="flex gap-5 items-center">
        <span>
          PAGE <HighlightedText>{page}</HighlightedText> of <strong>{totalPages}</strong>
        </span>
        <button type="button" onClick={previous} disabled={+page === 1} title="Previous">
          Previous
        </button>
        <button type="button" onClick={next} disabled={+page === totalPages} title="Next">
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
