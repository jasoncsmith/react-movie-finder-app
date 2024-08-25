import { createContext, Dispatch, ReactNode, Reducer, useContext, useReducer } from 'react'
import { GenreModel } from '../apis/genres'
import { MoviePreview } from '../apis/movies'

enum ACTION_TYPES {
  'genre' = 'genre',
  'paginate' = 'paginate',
  'search' = 'filter',
  'recordsPerPage' = 'recordsPerPage',
}

interface ActionPaginate {
  type: typeof ACTION_TYPES.paginate
  payload: string
}

interface ActionSearch {
  type: typeof ACTION_TYPES.search
  payload: string
}

interface ActionRecordsPerPage {
  type: typeof ACTION_TYPES.recordsPerPage
  payload: string
}

interface ActionSelectGenre {
  type: typeof ACTION_TYPES.genre
  payload: string
}

type Action = ActionSearch | ActionPaginate | ActionRecordsPerPage | ActionSelectGenre

interface State {
  allGenres: GenreModel[]
  movies: MoviePreview[]
  searchTerm: string
  totalPages: number
  limit: number
  page: string
  selectedGenre: string
  dispatch: Dispatch<Action>
}

interface MovieFinderProps {
  children: ReactNode
  defaultLimit: number
}

const MovieFinderContext = createContext<null | State>(null)

const params = new URLSearchParams(window.location.search)
const initialState: State = {
  allGenres: [],
  movies: [],
  totalPages: 0,
  page: params.get('page') ?? '1',
  searchTerm: params.get('search') ?? '',
  selectedGenre: params.get('genre') ?? '',
  limit: 6,
  dispatch: () => {},
}

function stateReducer(state: State, action: Action) {
  const { type, payload } = action

  if (type === ACTION_TYPES.paginate) {
    // TODO: Logic for keeping page within result set here
    return {
      ...state,
      page: payload,
    }
  }

  if (type === ACTION_TYPES.search) {
    return {
      ...state,
      searchTerm: payload,
    }
  }

  if (type === ACTION_TYPES.genre) {
    return {
      ...state,
      selectedGenre: payload,
    }
  }

  if (type === ACTION_TYPES.recordsPerPage) {
    return {
      ...state,
      limit: payload,
    }
  }

  return state
}

const MovieFinderProvider = ({ children, defaultLimit }: MovieFinderProps) => {
  const [appState, dispatch] = useReducer<Reducer<State, Action>>(stateReducer, {
    ...initialState,
    limit: defaultLimit,
  })

  return (
    <MovieFinderContext.Provider value={{ ...appState, dispatch }}>{children}</MovieFinderContext.Provider>
  )
}

const useMovieFinderContext = () => {
  const state = useContext(MovieFinderContext)

  if (!state) {
    throw new Error('state must be consumed within provider')
  }

  return state
}

export type { MovieFinderProps, ACTION_TYPES }
export { MovieFinderProvider, useMovieFinderContext }
