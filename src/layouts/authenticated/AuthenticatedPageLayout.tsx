import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavigationBarLayout from '../navigation';

import styles from './AuthenticatedPageLayoutStyles';

const AuthenticatedPageLayout = () => (
    <>
        <Box sx={styles.root}>
            <NavigationBarLayout />
            <Outlet />
        </Box>
    </>
);

export default AuthenticatedPageLayout;