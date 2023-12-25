import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Layout from './components/Layout.jsx';

const App = () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'about',
          element: <About />
        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App