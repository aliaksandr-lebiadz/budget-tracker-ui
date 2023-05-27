import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import {
    ChevronRight as RightArrowIcon,
    ExpandMore as BottomArrowIcon,
} from '@mui/icons-material';
import Routes from '../../../properties/Routes';

import styles from './NavigationBarItem.styles';

interface NestedItemProps {
    name: string,
    selected: boolean,
};

export interface ItemProps extends NestedItemProps {
    icon: JSX.Element,
    admin: boolean,
    nestedItems?: NestedItemProps[],
};

interface Props {
    item: ItemProps,
    expandedView: boolean,
    onSelect: (itemRoute: string) => void,
};

const NavigationBarItem = ({ item, onSelect, expandedView }: Props) => {

    const [expanded, setExpanded] = useState(item.selected && expandedView);

    useEffect(() => {

        setExpanded(item.selected && expandedView);
    }, [item.selected, expandedView])

    const toggleItem = () => {

        setExpanded(!expanded);
    };

    const handleSelect = () => {
        
        const route = Routes.INDEX + item.name.toLowerCase();
        onSelect(route);
    };

    const handleSelectNested = (nestedItem: NestedItemProps) => {

        if (!expandedView) {
            toggleItem();
        }

        const route = Routes.INDEX + item.name.toLowerCase() + Routes.INDEX + nestedItem.name.toLowerCase();
        onSelect(route);
    };

    return expandedView
        ? <>
            <Box
                sx={styles.expanded.root(item.selected)}
                onClick={() => item.nestedItems ? toggleItem() : handleSelect()}
            >
                {item.icon}
                {item.name}
                {item.nestedItems && (expanded
                    ? <BottomArrowIcon sx={styles.expanded.toggleIcon} />
                    : <RightArrowIcon sx={styles.expanded.toggleIcon} />
                )}
            </Box>
            {expanded && item.nestedItems?.map(nestedItem => (
                <Box
                    sx={styles.expanded.nested.wrapper(nestedItem.selected)}
                    key={nestedItem.name}
                    onClick={() => handleSelectNested(nestedItem)}
                >
                    <Box sx={styles.expanded.nested.dot(nestedItem.selected)}>
                        {nestedItem.selected ? <span>&#9679;</span> : <span>&#8226;</span>}
                    </Box>
                    {nestedItem.name}
                </Box>
            ))}
        </>
        : <>
            <Box
                sx={styles.collapsed.root(item.selected)}
                onClick={() => !item.nestedItems && handleSelect()}
                onMouseEnter={() => toggleItem()}
                onMouseLeave={() => toggleItem()}
            >
                {item.icon}
                {item.name}
                {item.nestedItems && (
                    <>
                        <RightArrowIcon sx={styles.collapsed.toggleIcon} />
                        {expanded && <Paper sx={styles.collapsed.nested.wrapper} elevation={5}>
                            {item.nestedItems?.map((nestedItem, index) => (
                                <Box
                                    sx={styles.collapsed.nested.element(nestedItem.selected)}
                                    key={nestedItem.name}
                                    tabIndex={index}
                                    onClick={() => handleSelectNested(nestedItem)}
                                >
                                    {nestedItem.name}
                                </Box>
                            ))}
                        </Paper>
                        }
                    </>
                )}
            </Box>
        </>
};

export default NavigationBarItem;