import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import Lottery from './pages/lottery';
// import Lottery from './component/Lottery';
// import Lottery from './pages/lottery';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/lottery/:id",
      element: <Lottery/>
    },
  ]);
  return (
    <div className="App">
      <Header />
      <main> 
        <RouterProvider router={router} /> 
      </main>
    </div>
  );
}

export default App;
