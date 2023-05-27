import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavigationBarLayout from '../navigation';

import styles from './AuthenticatedPageLayout.styles';

const AuthenticatedPageLayout = () => (
    <>
        <Box sx={styles.root}>
            <NavigationBarLayout />
            <Outlet />
        </Box>
    </>
);

export default AuthenticatedPageLayout;