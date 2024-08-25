import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="componentWrap">
      <button type="button" onClick={() => navigate('/')} title="Return to Home Page">
        Home
      </button>
      <h2 className="text-center text-4xl text-gray-300 font-bold pt-[100px]">404 - Not Found</h2>
    </div>
  )
}

export default NotFound
