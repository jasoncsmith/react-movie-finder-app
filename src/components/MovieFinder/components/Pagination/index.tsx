import { useLocation, useSearchParams } from 'react-router-dom'

interface PaginationProps {
  totalPages: number
  numResults: number
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const _page = searchParams.get('page')
  const search = searchParams.get('search') || ''
  const genre = searchParams.get('genre') || ''

  function previous() {
    const page = _page ? +_page : 1
    setSearchParams({ genre, search, page: page === 1 ? '1' : `${page - 1}` }, { replace: true })
  }

  function next() {
    const page = _page ? +_page : 1
    setSearchParams(
      {
        search,
        page: page === totalPages ? `${totalPages}` : `${page + 1}`,
        genre,
      },
      { replace: true }
    )
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="w-full py-4 flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <span>
          PAGE <strong>{_page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button type="button" onClick={previous} disabled={_page === '1'}>
          Previous
        </button>
        <button type="button" onClick={next} disabled={_page === `${totalPages}`}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination
