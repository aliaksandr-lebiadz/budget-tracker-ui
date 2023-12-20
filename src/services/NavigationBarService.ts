import { SectionProps } from '../layouts/navigation/section/NavigationBarSection';

class NavigationBarService {
    
    static getProcessedSections = (sections: SectionProps[], pathname: string, admin: boolean): SectionProps[] => {

        const [, selectedSection, selectedItem, selectedNestedItem] = pathname.split('/');
        return sections.map(section => ({
            ...section,
            items: section.items
                .filter(item => admin || !item.admin)
                .map(item => this.toPathPartInternal(section.name) === selectedSection && this.toPathPartInternal(item.name) === selectedItem
                    ? {
                        ...item,
                        selected: true,
                        nestedItems: item.nestedItems?.map(nestedItem => this.toPathPartInternal(nestedItem.name) === selectedNestedItem
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

    static toPathPart = (itemName: string): string => '/' + this.toPathPartInternal(itemName);

    private static toPathPartInternal = (itemName: string): string => itemName.toLowerCase().replaceAll(' ', '-');
};

export default NavigationBarService;