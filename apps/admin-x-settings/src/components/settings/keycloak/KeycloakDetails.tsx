import React from 'react';
import TopLevelGroup from '../../TopLevelGroup';
import {Button, withErrorBoundary} from '@tryghost/admin-x-design-system';
import {useRouting} from '@tryghost/admin-x-framework/routing';

const KeycloakDetails: React.FC<{ keywords: string[] }> = ({keywords}) => {
    const {updateRoute} = useRouting();
    //const {settings, config} = useGlobalData();

    const editKeycloakSettings = () => {
        updateRoute('keycloak/edit');
    } 

    return (
        <TopLevelGroup
            customButtons={<Button color='green' label='Customize' link linkWithPadding onClick={editKeycloakSettings}/>}
            description={<>Enable & configure Keyclaok as identity provider. <br /> <b>!!CAVEAT!!</b> <br /> if enabled any other memebership setting is overwritten.</>}
            keywords={keywords}
            navid='keycloak'
            testId='keycloak'
            title='Keycloak settings'
        >
        </TopLevelGroup>
    );
};

export default withErrorBoundary(KeycloakDetails, 'Keycloak details');
