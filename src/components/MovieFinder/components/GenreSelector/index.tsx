import { ChangeEvent } from 'react'

interface GenreSelectorProps {
  allGenres: { id: string; title: string; movies: { id: string }[] }[]
  selectedGenre: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const GenreSelector = ({ allGenres, onChange, selectedGenre }: GenreSelectorProps) => {
  return (
    <select
      className="w-full px-4 py-[18px] text-lg border border-slate-600 border-solid cursor-pointer"
      onChange={onChange}
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
