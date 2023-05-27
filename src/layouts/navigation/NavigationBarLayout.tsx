import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import {
    ChevronRight as RightArrowIcon,
    ChevronLeft as LeftArrowIcon,
    AdminPanelSettings as AdminIcon,
    AccountBalanceWallet as AccountIcon,
    Paid as MoneyIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../store/store';
import { useLocation } from 'react-router-dom';

import NavigationBarSection from './section/NavigationBarSection';

import styles from './NavigationBarLayout.styles';
import { NavigationBarService } from '../../services';

const sections = [
    {
        name: 'management',
        items: [
            {
                name: 'Admin',
                admin: true,
                icon: <AdminIcon />,
                nestedItems: [
                    { name: 'Banks' },
                    { name: 'Currencies' },
                ],
            },
            {
                name: 'Accounts',
                admin: false,
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics',
        items: [
            {
                name: 'Test',
                admin: false,
                icon: <AccountIcon />,
            },
        ],
    },
];

const NavigationBarLayout = () => {

    const { pathname } = useLocation();
    const { username, admin } = useAppSelector(state => state.user);
    const [expandedView, setExpandedView] = useState(true);

    const toggleView = () => {
        
        setExpandedView(!expandedView);
    };

    return (
        <Box sx={styles.root(expandedView)}>
            <Box sx={styles.header.wrapper(expandedView)}>
                <MoneyIcon sx={styles.header.logo} fontSize='large' />
                <Button sx={styles.header.toggleButton} onClick={() => toggleView()}>
                    {expandedView ? <LeftArrowIcon /> : <RightArrowIcon />}
                </Button>
                {expandedView &&
                    <Box sx={styles.header.userInfo.wrapper}>
                        <Box sx={styles.header.userInfo.icon}>
                            {username?.charAt(0)?.toUpperCase()}
                        </Box>
                        <Box sx={styles.header.userInfo.content.wrapper}>
                            <Typography sx={styles.header.userInfo.content.usernameText}>
                                {username}
                            </Typography>
                            <Typography sx={styles.header.userInfo.content.roleText}>
                                {admin ? 'admin' : 'user'}
                                </Typography>
                        </Box>
                    </Box>
                }
            </Box>
            <Box sx={styles.sectionsWrapper(expandedView)}>
                {//@ts-ignore
                    NavigationBarService.getProcessedSections(sections, pathname, admin).map(section => (
                        <NavigationBarSection
                            key={section.name}
                            expandedView={expandedView}
                            section={section}
                        />
                    ))
                }
            </Box>
        </Box>
    );
};

export default NavigationBarLayout;
