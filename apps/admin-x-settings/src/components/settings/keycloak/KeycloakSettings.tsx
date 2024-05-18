import KeycloakDeatils from './KeycloakDetails';
import React from 'react';
import SearchableSection from '../../SearchableSection';

export const searchKeywords = {
    settings: ['keycloak']
};

const KeycloakSettings: React.FC = () => {

    return (
        <SearchableSection keywords={Object.values(searchKeywords).flat()} title='Keycloak'>
            <KeycloakDeatils keywords={searchKeywords.settings} />
        </SearchableSection>
    );
};

export default KeycloakSettings;
