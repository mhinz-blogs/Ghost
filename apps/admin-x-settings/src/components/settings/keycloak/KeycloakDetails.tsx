import React from 'react';
import TopLevelGroup from '../../TopLevelGroup';
import {TextField,Toggle, withErrorBoundary, SettingGroupContent} from '@tryghost/admin-x-design-system';
import useSettingGroup from '../../../hooks/useSettingGroup';
import {getSettingValues} from '@tryghost/admin-x-framework/api/settings';
import {useState} from 'react';
//import {useGlobalData} from '../../providers/GlobalDataProvider';


const KeycloakDetails: React.FC<{ keywords: string[] }> = ({keywords}) => {

    const {
        localSettings,
        isEditing,
        saveState,
        handleSave,
        handleCancel,
        updateSetting,
        handleEditingChange
    } = useSettingGroup();

    const [keycloakTokenUrl, keycloakRolePrefix] = getSettingValues<string>(localSettings, ['keycloak_auth_url', 'keycloak_role_prefix']);
    const [keycloakEnabled] = getSettingValues<boolean>(localSettings, ['keycloak_enabled']);
    const [nameLength, setNameLength] = useState(0);
    const nameLengthColor = nameLength > 255 ? 'text-red' : 'text-green';
    const toggleEdit = () => {
        handleEditingChange(!isEditing);
        setNameLength(keycloakTokenUrl?.length || 0);
    }

    const form = (
        <SettingGroupContent columns={1}>

            <TextField
                value={keycloakTokenUrl}
                disabled={!keycloakEnabled || !isEditing}
                hint={<div className='flex justify-between'><strong><span className={`${nameLengthColor}`}>{nameLength}</span> / 255</strong></div>}
                maxLength={255}
                placeholder='Keycloak Auth URL'
                title='Keycloak Auth URL'
                onChange={(e) => {
                    updateSetting('keycloak_auth_url', e?.target.value || null);
                    setNameLength(e.target.value.length);
                }}
            />
            <TextField
                value={keycloakRolePrefix}
                disabled={!keycloakEnabled || !isEditing}
                hint={<div className='flex justify-between'>Prefix of the roles to be applied to the user in Ghost</div>}
                maxLength={10}
                placeholder='ghost_'
                title='Keycloak role prefix'
                onChange={(e) => {
                    updateSetting('keycloak_role_prefix', e?.target.value || null);

                }}
            />
        </SettingGroupContent>
    );

    return (
        <TopLevelGroup
            description={<>Enable & configure Keyclaok as identity provider. <br /> <b>!!CAVEAT!!</b> <br /> if enabled any other memebership setting is overwritten.</>}
            isEditing={isEditing}
            keywords={keywords}
            saveState={saveState}
            onCancel={handleCancel}
            onEditingChange={toggleEdit}
            onSave={handleSave}

            navid='keycloak'
            testId='keycloak'
            title='Keycloak settings'
        >
            <Toggle label='Enable Keycloak' size='lg' labelClasses='text-lg'  direction='rtl' toggleBg='green'
                checked={keycloakEnabled}
                disabled={!isEditing}
                onChange={(e) => {
                    updateSetting('keycloak_enabled', e?.target.checked || false);

                }}
            />
            {form}
        </TopLevelGroup>
    );
};

export default withErrorBoundary(KeycloakDetails, 'Keycloak details');
