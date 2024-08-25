import { pluralize } from '../../../../utils'
import { HighlightedText } from '../Results'

const NumResultsDisplay = ({
  numMovies,
  estimatedSearchResultCount,
}: {
  numMovies: number
  estimatedSearchResultCount: string
}) => (
  <span className={`uppercase ${!numMovies ? 'invisible' : ''}`}>
    <HighlightedText>{estimatedSearchResultCount}</HighlightedText> Movie
    {pluralize(estimatedSearchResultCount)} Found
  </span>
)

export default NumResultsDisplay
