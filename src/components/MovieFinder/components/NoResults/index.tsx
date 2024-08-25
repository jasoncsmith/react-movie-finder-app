import { ReactNode } from 'react'

interface NoResultsProps {
  children: string | ReactNode
}
const NoResults = ({ children }: NoResultsProps) => <div className="text-2xl text-center">{children}</div>

export default NoResults
