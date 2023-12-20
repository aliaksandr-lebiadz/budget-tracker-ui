import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';
import styles from './NavigationBarSection.styles';
import NavigationBarItem, { ItemProps } from '../item/NavigationBarItem';

import { NavigationBarService } from '../../../services';

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

        const route = NavigationBarService.toPathPart(section.name) + itemRoute;
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