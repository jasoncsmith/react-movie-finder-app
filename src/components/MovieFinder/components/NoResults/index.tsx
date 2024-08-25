import { ReactNode } from 'react'

interface NoResultsProps {
  children: string | ReactNode
}
const NoResults = ({ children }: NoResultsProps) => (
  <div className="text-center text-3xl text-gray-300 font-bold pt-[100px]">{children}</div>
)

export default NoResults
