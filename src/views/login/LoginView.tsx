import { useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useAppDispatch } from '../../store/store';
import { login, loginAndRemember } from '../../store/user/userSlice';
import Routes from '../../properties/Routes';

import OnboardingPage from '../onboarding';

import styles from './LoginView.styles';

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
                    <FormControlLabel
                        control={
                            <Checkbox
                                sx={styles.rememberMe.checkbox}
                                onChange={handleRememberMeChange}
                            />
                        }
                        label={
                            <Typography sx={styles.rememberMe.label}>
                                Remember me
                            </Typography>
                        }
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
