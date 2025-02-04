import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
// import Login from './pages/Login.tsx';
// import SignUp from './pages/SignUp.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: '/Signup',
      //   element: <Login />,
      // },
      // {
      //   path: '/Login',
      //   element: <SignUp></SignUp>
      // }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}