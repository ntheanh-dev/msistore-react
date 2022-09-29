import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { productsFetch } from './redux/productsSlice';
import { publicRoutes } from './routes';
import DefaultLayout from './Layouts/DefauLayout';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productsFetch())
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = DefaultLayout
            const Page = route.component
            return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
