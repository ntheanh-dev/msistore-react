import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useMemo } from 'react';

import { UserContext } from './pages/SignIng/UserContext';
import { publicRoutes } from './routes';
import DefaultLayout from './Layouts/DefauLayout';
import { useState } from 'react';
function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || null)
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={providerValue}>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = DefaultLayout
              const Page = route.component
              return <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
            })}
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
