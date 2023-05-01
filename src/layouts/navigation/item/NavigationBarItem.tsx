import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import {
    ChevronRight as RightArrowIcon,
    ExpandMore as BottomArrowIcon,
} from '@mui/icons-material';
import Routes from '../../../properties/Routes';

import { expandedViewStyles, collapsedViewStyles } from './NavigationBarItemStyles';

interface NestedItemProps {
    name: string,
    selected: boolean,
};

export interface ItemProps extends NestedItemProps {
    icon: JSX.Element,
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
                sx={expandedViewStyles.itemWrapper(item.selected)}
                onClick={() => item.nestedItems ? toggleItem() : handleSelect()}
            >
                {item.icon}
                {item.name}
                {item.nestedItems && (expanded
                    ? <BottomArrowIcon sx={expandedViewStyles.toggleIcon} />
                    : <RightArrowIcon sx={expandedViewStyles.toggleIcon} />
                )}
            </Box>
            {expanded && item.nestedItems?.map(nestedItem => (
                <Box
                    key={nestedItem.name}
                    sx={expandedViewStyles.nestedItemWrapper(nestedItem.selected)}
                    onClick={() => handleSelectNested(nestedItem)}
                >
                    <Box sx={expandedViewStyles.nestedItemDot(nestedItem.selected)}>
                        {nestedItem.selected ? <span>&#9679;</span> : <span>&#8226;</span>}
                    </Box>
                    {nestedItem.name}
                </Box>
            ))}
        </>
        : <>
            <Box
                sx={collapsedViewStyles.itemWrapper(item.selected)}
                onClick={() => !item.nestedItems && handleSelect()}
                onMouseEnter={() => toggleItem()}
                onMouseLeave={() => toggleItem()}
            >
                {item.icon}
                {item.name}
                {item.nestedItems && (
                    <>
                        <RightArrowIcon sx={collapsedViewStyles.toggleIcon} />
                        {expanded && <Paper elevation={5} sx={collapsedViewStyles.nestedItemsWrapper}>
                            {item.nestedItems?.map((nestedItem, index) => (
                                <Box
                                    key={nestedItem.name}
                                    tabIndex={index}
                                    sx={collapsedViewStyles.nestedItemWrapper(nestedItem.selected)}
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