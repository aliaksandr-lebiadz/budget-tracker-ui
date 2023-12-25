import { useState } from 'react';
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
import { OnboardingService } from '../../services';

import styles from './OnboardingView.styles';

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

interface FieldsState {
    username?: string,
    password?: string,
};

interface ErrorsState {
    username: boolean,
    password: boolean,
    show: boolean,
};

const OnboardingView = (props: Props) => {
    
    const [fields, setFields] = useState<FieldsState>({});

    const [errors, setErrors] = useState<ErrorsState>({
        username: false,
        password: false,
        show: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFields(previousFields => ({
            ...previousFields,
            [name]: value,
        }));
        setErrors(previousErrors => ({
            ...previousErrors,
            //@ts-ignore
            [name]: previousErrors.show ? !OnboardingService.isValid(name, value) : previousErrors[name],
        }));
    };

    const handleSubmit: React.FormEventHandler<HTMLDivElement> = (e: React.FormEvent<HTMLDivElement>) => {
        
        e.preventDefault();

        const usernameValid = OnboardingService.isUsernameValid(fields.username);
        const passwordValid = OnboardingService.isPasswordValid(fields.password);
        if (!usernameValid || !passwordValid) {
            setErrors({
                username: !usernameValid,
                password: !passwordValid,
                show: true,
            });
        } else {
            props.onboard(fields.username!, fields.password!);
        }
    };

    return (
        <Box sx={styles.root}>
            <Paper sx={styles.dialog.wrapper} elevation={3}>
                <Box sx={styles.dialog.title.wrapper}>
                    <Typography sx={styles.dialog.title.text}>
                        {props.title}
                    </Typography>
                </Box>
                <Box sx={styles.dialog.content.wrapper}>
                    <Box sx={styles.dialog.content.form} component='form' onSubmit={handleSubmit}>
                        <TextField
                            sx={styles.dialog.content.textField}
                            autoFocus
                            type='text'
                            name='username'
                            placeholder='Username'
                            size='small'
                            variant='filled'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment sx={styles.dialog.content.iconWrapper} position='start'>
                                        <UsernameIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            error={errors.username}
                            helperText={errors.username && OnboardingService.messages.invalidUsername}
                            onChange={handleInputChange}
                        />
                        <TextField
                            sx={styles.dialog.content.textField}
                            type='password'
                            name='password'
                            placeholder='Password'
                            size='small'
                            variant='filled'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment sx={styles.dialog.content.iconWrapper} position='start'>
                                        <PasswordIcon />
                                    </InputAdornment>
                                ),
                                disableUnderline: true,
                            }}
                            error={errors.password}
                            helperText={errors.password && OnboardingService.messages.invalidPassword}
                            onChange={handleInputChange}
                        />
                        {props.additionalContent}
                        <Button
                            sx={styles.dialog.content.button}
                            variant='contained'
                            type='submit'
                            disabled={errors.username || errors.password}
                        >
                            {props.title}
                        </Button>
                    </Box>
                    <Typography sx={styles.dialog.content.hint}>
                        {props.hint.text} <Link to={props.hint.link.route}>{props.hint.link.text}</Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default OnboardingView;