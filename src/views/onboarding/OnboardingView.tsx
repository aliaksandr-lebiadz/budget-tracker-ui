import React, { useState } from 'react';
import {
    PersonOutlineOutlined as UsernameIcon,
    LockOutlined as PasswordIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

import { OnboardingComponents } from '../../components';
import OnboardingService from '../../services/OnboardingService';

interface HintLinkProps {
    text: string,
    route: string,
};

interface HintProps {
    text: string,
    link: HintLinkProps,
};

interface Props {
    title: string,
    additionalContent?: React.ReactNode,
    hint: HintProps,
    onboard: (username: string, password: string) => void
};

interface State {
    username?: string,
    password?: string,
    errors: {
        username: boolean,
        password: boolean,
        show: boolean,
    },
};

const OnboardingView = (props: Props) => {
    
    const initialState = { 
        errors: {
            username: false,
            password: false,
            show: false,
        },
    };

    const [state, setState] = useState<State>(initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setState((previousState: State) => ({
            ...previousState,
            [name]: value,
            errors: {
                ...previousState.errors,
                // @ts-ignore
                [name]: previousState.errors.show ? !OnboardingService.isValid(name, value) : previousState.errors[name],
            },
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const usernameValid = OnboardingService.isUsernameValid(state.username);
        const passwordValid = OnboardingService.isPasswordValid(state.password);
        if (!usernameValid || !passwordValid) {
            setState((previousState: State) => ({
                ...previousState,
                errors: {
                    username: !usernameValid,
                    password: !passwordValid,
                    show: true,
                },
            }));
        } else {
            props.onboard(state.username!, state.password!);
            setState((previousState: State) => ({
                ...previousState,
                initialState,
            }));
        }
    };

    return (
        <OnboardingComponents.Wrapper>
            <OnboardingComponents.Dialog elevation={3}>
                <OnboardingComponents.Title.Wrapper component='div'>
                    <OnboardingComponents.Title.Text>{props.title}</OnboardingComponents.Title.Text>
                </OnboardingComponents.Title.Wrapper>
                <OnboardingComponents.Content.Wrapper>
                    <OnboardingComponents.Content.Form onSubmit={handleSubmit}>
                        <OnboardingComponents.Content.TextField
                            type='text'
                            name='username'
                            placeholder='Username'
                            size='small'
                            variant='filled'
                            InputProps={{
                                startAdornment: (
                                    <OnboardingComponents.Content.IconWrapper position='start'>
                                        <UsernameIcon />
                                    </OnboardingComponents.Content.IconWrapper>
                                ),
                                disableUnderline: true,
                            }}
                            error={state.errors.username}
                            helperText={state.errors.username && 'Length should be from 6 to 32'}
                            onChange={handleInputChange}
                        />
                        <OnboardingComponents.Content.TextField
                            type='password'
                            name='password'
                            placeholder='Password'
                            size='small'
                            variant='filled'
                            InputProps={{
                                startAdornment: (
                                    <OnboardingComponents.Content.IconWrapper position='start'>
                                        <PasswordIcon />
                                    </OnboardingComponents.Content.IconWrapper>
                                ),
                                disableUnderline: true,
                            }}
                            error={state.errors.password}
                            helperText={state.errors.password && 'Length should be from 8 to 32'}
                            onChange={handleInputChange}
                        />
                        {props.additionalContent}
                        <OnboardingComponents.Content.Button
                            variant='contained'
                            type='submit'
                            disabled={state.errors.username || state.errors.password}
                        >
                            {props.title}
                        </OnboardingComponents.Content.Button>
                    </OnboardingComponents.Content.Form>
                    <OnboardingComponents.Content.Hint>
                        {props.hint.text} <Link to={props.hint.link.route}>{props.hint.link.text}</Link>
                    </OnboardingComponents.Content.Hint>
                </OnboardingComponents.Content.Wrapper>
            </OnboardingComponents.Dialog>
        </OnboardingComponents.Wrapper>
    )
};

export default OnboardingView;