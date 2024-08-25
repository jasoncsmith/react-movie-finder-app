import { Rating } from '../../../../apis/movies'

export const MovieRating = ({ rating }: { rating: Rating | undefined }) => (
  <p className="text-red-600 p-1 border-solid border-red-600 text-2xl inline-block font-bold static mb-2 md:mb-0 md:absolute right-1 top-1 bg-white min-w-16 text-center">
    {rating ? rating : 'Not Rated'}
  </p>
)
