import { Routes, Route } from 'react-router-dom'
import MovieFinder from './components/MovieFinder'
import NotFound from './components/NotFound'
import MovieDetail from './components/MovieFinder/components/MovieDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieFinder />} />
      <Route path="movies/:id" element={<MovieDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
