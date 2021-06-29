import React, { FC, useState, useMemo, useCallback, ReactNode } from 'react';
import { TabsResponsive, Tab, TabsResponsiveProps } from '@alfalab/core-components-tabs';
import { Description } from '@storybook/addon-docs/blocks';

enum TabName {
    DESCRIPTION = 'DESCRIPTION',
    PROPS = 'PROPS',
    CSS_VARS = 'CSS_VARS',
    CHANGELOG = 'CHANGELOG',
}

const TabTitle = {
    [TabName.DESCRIPTION]: 'Описание',
    [TabName.PROPS]: 'Свойства',
    [TabName.CSS_VARS]: 'CSS-переменные',
    [TabName.CHANGELOG]: 'Changelog',
};

type Props = {
    description: ReactNode;
    prpos: ReactNode;
    cssVars?: ReactNode;
    changelog?: string;
    defaultSelected?: TabName;
};

export const Tabs: FC<Props> = ({
    description,
    prpos,
    cssVars,
    changelog,
    defaultSelected = TabName.DESCRIPTION,
}) => {
    const [selected, setSelected] = useState(defaultSelected);

    const handleChange = useCallback<Required<TabsResponsiveProps>['onChange']>(
        (_, { selectedId }) => {
            setSelected(selectedId as TabName);
        },
        [],
    );

    const renderTabs = (): TabsResponsiveProps['children'] => {
        const result = [
            <Tab title={TabTitle[TabName.DESCRIPTION]} id={TabName.DESCRIPTION}>
                <div style={{ marginTop: '40px' }}>{description}</div>
            </Tab>,
            <Tab title={TabTitle[TabName.PROPS]} id={TabName.PROPS}>
                {prpos}
            </Tab>,
        ];

        if (cssVars) {
            result.push(
                <Tab title={TabTitle[TabName.CSS_VARS]} id={TabName.CSS_VARS}>
                    <div style={{ marginTop: '40px' }}>{cssVars}</div>
                </Tab>,
            );
        }

        if (changelog) {
            result.push(
                <Tab title={TabTitle[TabName.CHANGELOG]} id={TabName.CHANGELOG}>
                    <div style={{ marginTop: '40px' }}>
                        <Description>
                            {changelog
                                .replace('# Change Log', '')
                                .replace(
                                    'All notable changes to this project will be documented in this file.',
                                    '',
                                )
                                .replace(
                                    'See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.',
                                    '',
                                )}
                        </Description>
                    </div>
                </Tab>,
            );
        }

        return result;
    };

    const tabs = useMemo(() => renderTabs(), [description, prpos, cssVars]);

    return (
        <TabsResponsive selectedId={selected} onChange={handleChange}>
            {tabs}
        </TabsResponsive>
    );
};
