import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import nextId from 'react-id-generator';
import { logOut } from '../store/user/userSlice';
import { addFlashMessage } from '../store/flash-message/flashMessageSlice';
import Routes from '../properties/Routes';
import LocalStorageItems from '../properties/LocalStorageItem';
import { TOKENS_LIFETIME } from '../properties/Properties';
import { ApiMessage } from '../properties/api';
import { RootState } from '../store/store';
import { FlashMessageType } from '../store/flash-message/types';

export const withAuthentication = (WrappedComponent: any, admin: boolean = false) => {

    type Props = PropsFromRedux;

    const WithAuthentication = (props: Props) => (
        props.authenticated
            ? (props.admin || !admin ? <WrappedComponent {...props} /> : <Navigate to={{ pathname: Routes.INDEX }} />)
            : <Navigate to={{ pathname: Routes.LOGIN }} />
    );

    const mapStateToProps = (state: RootState) => ({
        authenticated: state.user.authenticated,
        admin: state.user.admin,
    });

    const connector = connect(mapStateToProps);

    type PropsFromRedux = ConnectedProps<typeof connector>;

    return connector(WithAuthentication);
};

export const withoutAuthentication = (WrappedComponent: any) => {

    type Props = PropsFromRedux;

    const WithoutAuthentication = (props: Props) => (
        props.authenticated
            ? <Navigate to={{ pathname: Routes.INDEX }} />
            : <WrappedComponent {...props} />
    );

    const mapStateToProps = (state: RootState) => ({
        authenticated: state.user.authenticated,
    });

    const connector = connect(mapStateToProps);

    type PropsFromRedux = ConnectedProps<typeof connector>;

    return connector(WithoutAuthentication);
};

export const checkTokensExpiration = (store: any) => {
    const tokensExpireAt = localStorage.getItem(LocalStorageItems.TOKENS_EXPIRE_AT);
    if (tokensExpireAt) {
        if (tokensExpireAt < Date.now().toString()) {
            localStorage.removeItem(LocalStorageItems.ACCESS_TOKEN);
            localStorage.removeItem(LocalStorageItems.REFRESH_TOKEN);
            localStorage.removeItem(LocalStorageItems.TOKENS_EXPIRE_AT);
            store.dispatch(logOut());
            store.dispatch(addFlashMessage({
                id: nextId(),
                type: FlashMessageType.INFO,
                message: ApiMessage.AUTO_LOG_OUT,
            }));
        } else {
            localStorage.setItem(LocalStorageItems.TOKENS_EXPIRE_AT, (Date.now() + TOKENS_LIFETIME).toString());
        }
    }
};