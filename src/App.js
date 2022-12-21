import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

import { productsFetch } from './redux/productsSlice';
import { publicRoutes } from './routes';
import DefaultLayout from './Layouts/DefauLayout';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(productsFetch())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = DefaultLayout
            const Page = route.component
            return <Route key={index} path={route.path} element={route.isNotDefault ? <Page /> : <Layout><Page /></Layout>} />
          })}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
