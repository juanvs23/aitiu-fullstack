import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, Register } from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/register',
		element: <Register />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
