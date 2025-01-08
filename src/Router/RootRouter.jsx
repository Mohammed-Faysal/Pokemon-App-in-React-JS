import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import Favourite from '../Pages/Favourite';
import Navbar from '../Components/Navbar';
import ErrorPage from '../Pages/ErrorPage';
import DetailsPage from '../Pages/DetailsPage';

export const rootRouter = createBrowserRouter([
    {
        path: "/", 
        element: <Navbar/>,
        children: [
            {
                path: "/", 
                element: <Home/>
            }, 
            {
                path: "/favourite", 
                element: <Favourite/>
            },
            {
                path: "/details/:name", 
                element: <DetailsPage/>
            },
            {
                path: "*", 
                element: <ErrorPage/>
            }
        ]
    }
])
