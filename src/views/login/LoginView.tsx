import { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { login, loginAndRemember } from '../../store/user/userSlice';
import OnboardingPage from '../onboarding';
import Routes from '../../properties/Routes';

import styles from './LoginViewStyles';

const LoginView = () => {

    const dispatch = useAppDispatch();

    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setRememberMe(e.target.checked);
    };

    const handleOnboard = (username: string, password: string) => {

        const doLogin = rememberMe ? loginAndRemember : login;
        dispatch(doLogin({
            username,
            password,
        }));
    };

    return (
        <OnboardingPage
            title='Login'
            additionalContent={
                    <FormControlLabel sx={styles.rememberMeControl}
                        control={<Checkbox sx={styles.rememberMeCheckbox} onChange={handleRememberMeChange} />}
                        label='Remember me'
                    />
            }
            hint={{
                text: `Don't have an account?`,
                link: {
                    text: 'Sign up now',
                    route: Routes.SIGN_UP,
                },
            }}
            onboard={handleOnboard}
        />
    )
};

export default LoginView;
