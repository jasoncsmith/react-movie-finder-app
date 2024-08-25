import { ChangeEventHandler } from 'react'

interface SearchProps {
  searchTerm: string
  handleSearchChange: ChangeEventHandler<HTMLInputElement>
}
const Search = ({ searchTerm, handleSearchChange }: SearchProps) => (
  <input
    className="p-4 text-lg leading-1 w-full border border-slate-600 border-solid"
    placeholder={'Search Movies'}
    type="text"
    value={searchTerm}
    onChange={handleSearchChange}
  />
)

export default Search
