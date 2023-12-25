import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import LoginView from './login';
import SignUpView from './sign-up';
import HomeView from './home';
import CurrenciesView from './сurrencies';
import CardTypesView from './card-types';
import FlashMessagesView from './flash-message';
import BanksView from './banks';
import Routes from '../properties/Routes';
import AuthenticatedPageLayout from '../layouts/authenticated/AuthenticatedPageLayout';

import './App.scss';

const App = () => (
    <>
        <FlashMessagesView />
        <BrowserRouter>
            <Switch>
                <Route path={Routes.INDEX} element={<AuthenticatedPageLayout />}>
                    <Route path={Routes.BANKS} element={<BanksView />} />
                    <Route path={Routes.CARD_TYPES} element={<CardTypesView />} />
                    <Route path={Routes.CURRENCIES} element={<CurrenciesView />} />
                    <Route path='/' element={<HomeView />} />
                </Route>
                <Route path={Routes.LOGIN} element={<LoginView />} />
                <Route path={Routes.SIGN_UP} element={<SignUpView />} />
            </Switch>
        </BrowserRouter>
    </>
);

export default App;
