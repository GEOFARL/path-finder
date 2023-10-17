import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import VisualizerPage from './pages/VisualizerPage';
import StatsPage from './pages/StatsPage';
import ErrorPage from './pages/ErrorPage';

document.addEventListener('dragover', (e) => e.preventDefault());

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <VisualizerPage />,
      },
      {
        path: 'stats',
        element: <StatsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
