import './App.css'
import { Outlet } from 'react-router-dom';
// import Header from './components/Header';

function App() {

  return (
    <>
      <div className='site'>
        {/* <Header></Header> */}
          <Outlet />
      </div>
    </>
  )
}

export default App
