import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
} from '@mui/material';
import {
    ChevronRight as RightArrowIcon,
    ChevronLeft as LeftArrowIcon,
    Paid as MoneyIcon,
    AdminPanelSettings as AdminIcon,
    AccountBalanceWallet as AccountIcon,
} from '@mui/icons-material';
import { useAppSelector } from '../../store/store';
import { useLocation } from 'react-router-dom';

import styles from './NavigationBarLayoutStyles';
import NavigationBarSection from './section/NavigationBarSection';

const sections = [
    {
        name: 'management',
        items: [
            {
                name: 'Admin',
                icon: <AdminIcon />,
                admin: true,
                nestedItems: [
                    { name: 'Banks' },
                    { name: 'Currencies' },
                ],
            },
            {
                name: 'Accounts',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics1',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics2',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics3',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics4',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics5',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics6',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics7',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics8',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics9',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics10',
        items: [
            {
                name: 'Test',
                icon: <AccountIcon />,
            },
        ],
    },
    {
        name: 'analytics11',
        items: [
            {
                name: 'Test',
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

    const getProcessedSections = () => {

        const [, selectedSection, selectedItem, selectedNestedItem] = pathname.split('/');
        return sections.map(section => ({
            ...section,
            items: section.items
                .filter(item => admin || !item.admin)
                .map(item => section.name === selectedSection && item.name.toLowerCase() === selectedItem
                    ? {
                        ...item,
                        selected: true,
                        nestedItems: item.nestedItems?.map(nestedItem => nestedItem.name.toLowerCase() === selectedNestedItem
                            ? { ...nestedItem, selected: true }
                            : { ...nestedItem, selected: false }
                        )
                    }
                    : {
                        ...item,
                        selected: false,
                        nestedItems: item.nestedItems?.map(nestedItem => ({ ...nestedItem, selected: false }))
                    }
                )
        }));
    };

    return (
        <Box sx={styles.root(expandedView)}>
            <Box sx={styles.headerWrapper(expandedView)}>
                <MoneyIcon fontSize='large' sx={styles.logo} />
                <Button sx={styles.toggleButtonWrapper} onClick={() => toggleView()}>
                    {expandedView ? <LeftArrowIcon /> : <RightArrowIcon />}
                </Button>
                {expandedView &&
                    <Box sx={styles.userInfoWrapper}>
                        <Box sx={styles.userInfoIcon}>
                            {username?.charAt(0)?.toUpperCase()}
                        </Box>
                        <Box sx={styles.userInfoContentWrapper}>
                            <Typography sx={styles.usernameText}>
                                {username}
                            </Typography>
                            <Typography sx={styles.roleText}>
                                {admin ? 'admin' : 'user'}
                            </Typography>
                        </Box>
                    </Box>
                }
            </Box>
            <Box sx={styles.sectionsWrapper(expandedView)}>
                {getProcessedSections().map(section => (
                    <NavigationBarSection
                        key={section.name}
                        expandedView={expandedView}
                        // @ts-ignore
                        section={section}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default NavigationBarLayout;
