import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginView from './login';
import SignUpView from './sign-up';
import HomeView from './home';
import Routes from '../properties/Routes';

import './App.scss';
import FlashMessagesView from './flash-message';

const router = createBrowserRouter([
    {
        path: Routes.HOME,
        element: <HomeView />,
    },
    {
        path: Routes.LOGIN,
        element: <LoginView />,
    },
    {
        path: Routes.SIGN_UP,
        element: <SignUpView />,
    },
]);

const App = () => (
    <>
        <FlashMessagesView />
        <RouterProvider router={router} />
    </>
);

export default App;
