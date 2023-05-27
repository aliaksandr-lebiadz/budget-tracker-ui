import { SectionProps } from '../layouts/navigation/section/NavigationBarSection';

class NavigationBarService {
    
    static getProcessedSections = (sections: SectionProps[], pathname: string, admin: boolean): SectionProps[] => {

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
};

export default NavigationBarService;