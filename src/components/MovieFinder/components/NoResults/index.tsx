import { ReactNode } from 'react'

interface NoResultsProps {
  children: string | ReactNode
}
const NoResults = ({ children }: NoResultsProps) => (
  <div>
    {typeof children === 'string' ? (
      <h2 className="text-2xl text-center text-white">{children}</h2>
    ) : (
      children
    )}
  </div>
)

export default NoResults
