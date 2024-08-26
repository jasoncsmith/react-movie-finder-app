import Results from './components/Results'
import Pagination from './components/Pagination'
import Search from './components/Search'
import GenreSelector from './components/GenreSelector'
import FlexTwoColumn from '../Layout/FlexTwoColumn'
import NumResultsDisplay from './components/NumResultsDisplay'

import styles from './index.module.scss'

const MovieFinder = () => {
  return (
    <div className={styles.movieFinder}>
      <FlexTwoColumn options="80/20">
        <Search />
        <GenreSelector />
      </FlexTwoColumn>
      <FlexTwoColumn options="50/50" className={styles.controls}>
        <NumResultsDisplay />
        <Pagination />
      </FlexTwoColumn>
      <Results />
    </div>
  )
}

export default MovieFinder
