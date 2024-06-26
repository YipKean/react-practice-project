import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './views/Login';
import SignUp from './views/SignUp';
import User from './views/Users';
import NotFound from './views/NotFound';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Dashboard from './views/Dashboard';
import UserForm from './views/UserForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/User' />
            },
            {
                path: '/User',  // This is relative to '/'
                element: <User />
            },
            {
                path: '/Dashboard', // This is relative to '/'
                element: <Dashboard />
            },            {
                path: '/User/new',  // This is relative to '/'
                element: <UserForm key="userCreate"/>
            },            {
                path: '/User/:id',  // This is relative to '/'
                element: <UserForm key="userUpdate"/>
            }

        ]
    },
    {
        path: '/',  // This is relative to '/'
        element: <GuestLayout />,
        children: [
            {
                path: '/login',  // This is now relative to '/GuestLayout'
                element: <Login />
            },
            {
                path: '/SignUp',  // This is now relative to '/GuestLayout'
                element: <SignUp />
            },
        ]
    },

    {
        path: '*', // This catches all unmatched routes
        element: <NotFound />
    }
]);


export default router;