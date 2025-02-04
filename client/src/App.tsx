import './App.css'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div className='site'>
          <Outlet />
      </div>
    </>
  )
}

export default App
