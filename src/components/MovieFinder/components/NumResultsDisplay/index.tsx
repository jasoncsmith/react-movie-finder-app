import { useMovieFetcher } from '../../../../hooks/useMovieFetcher'
import { pluralize } from '../../../../utils'
import { HighlightedText } from '../Results'

const NumResultsDisplay = () => {
  const { movies, estimatedSearchResultCount } = useMovieFetcher()

  return (
    <span className={`uppercase ${!movies.length ? 'invisible' : ''}`}>
      <HighlightedText>{estimatedSearchResultCount}</HighlightedText> Movie
      {pluralize(estimatedSearchResultCount)} Found
    </span>
  )
}

export default NumResultsDisplay
