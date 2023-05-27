import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import Routes from '../../../properties/Routes';
import NavigationBarItem, { ItemProps } from '../item/NavigationBarItem';

import styles from './NavigationBarSection.styles';

export interface SectionProps {
    name: string,
    items: ItemProps[],
};

interface Props {
    section: SectionProps,
    expandedView: boolean,
};

const NavigationBarSection = ({ section, expandedView }: Props) => {

    const navigate = useNavigate();

    const handleSelect = (itemRoute: string) => {

        const route = Routes.INDEX + section.name + itemRoute;
        navigate(route);
    };

    return (
        <Box sx={styles.root}>
            {expandedView
                ? <Typography sx={styles.header}>
                    {section.name}
                </Typography>
                : <Divider sx={styles.divider} />
            }
            {section.items.map(item => (
                <NavigationBarItem
                    key={item.name}
                    item={item}
                    expandedView={expandedView}
                    onSelect={handleSelect}
                />
            ))}
        </Box>
    );
};

export default NavigationBarSection;