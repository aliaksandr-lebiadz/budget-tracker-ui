import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    InputAdornment,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {
    PersonOutlineOutlined as UsernameIcon,
    LockOutlined as PasswordIcon,
} from '@mui/icons-material';
import OnboardingService from '../../services/OnboardingService';

import styles from './OnboardingViewStyles';

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
        <Box sx={styles.root}>
            <Paper elevation={3} sx={styles.dialog}>
                <Box sx={styles.titleWrapper}>
                    <Typography sx={styles.titleText}>
                        {props.title}
                    </Typography>
                </Box>
                <Box sx={styles.contentWrapper}>
                    <Box component='form' sx={styles.form} onSubmit={handleSubmit}>
                        <TextField sx={styles.textField}
                            type='text'
                            name='username'
                            placeholder='Username'
                            size='small'
                            variant='filled'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment sx={styles.iconWrapper} position='start'>
                                        <UsernameIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            error={state.errors.username}
                            helperText={state.errors.username && 'Length should be from 6 to 32'}
                            onChange={handleInputChange}
                        />
                        <TextField sx={styles.textField}
                            type='password'
                            name='password'
                            placeholder='Password'
                            size='small'
                            variant='filled'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment sx={styles.iconWrapper} position='start'>
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            error={state.errors.password}
                            helperText={state.errors.password && 'Length should be from 8 to 32'}
                            onChange={handleInputChange}
                        />
                        {props.additionalContent}
                        <Button sx={styles.button}
                            variant='contained'
                            type='submit'
                            disabled={state.errors.username || state.errors.password}
                        >
                            {props.title}
                        </Button>
                    </Box>
                    <Typography sx={styles.hint}>
                        {props.hint.text} <Link to={props.hint.link.route}>{props.hint.link.text}</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    )
};

export default OnboardingView;