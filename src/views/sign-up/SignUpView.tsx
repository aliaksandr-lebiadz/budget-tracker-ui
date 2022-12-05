import { useNavigate } from 'react-router-dom';

import OnboardingPage from '../onboarding';
import Routes from '../../properties/Routes';
import { useAppDispatch } from '../../store/store';
import { signUp } from '../../store/user/userSlice';
import { isSuccess } from '../../store/utils/actionUtils';

const SignUpView = () => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOnboard = (username: string, password: string) => {

        dispatch(signUp({
            username,
            password,
        }))
        .then((response) => {
            if (isSuccess(response.type)) {
                navigate(Routes.LOGIN);
            }
        });
    };

    return (
        <OnboardingPage
            title='Sign up'
            hint={{
                text: `Already have an account?`,
                link: {
                    text: 'Login now',
                    route: Routes.LOGIN,
                },
            }}
            onboard={handleOnboard}
        />
    )
};

export default SignUpView;
