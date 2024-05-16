import NiceModal, {useModal} from '@ebay/nice-modal-react';
import {TextField, Toggle, Modal} from '@tryghost/admin-x-design-system';
import {RoutingModalProps, useRouting} from '@tryghost/admin-x-framework/routing';
import {useCallback, useState} from 'react';


const KeycloakDetailsModal = NiceModal.create<RoutingModalProps>(({params}) => {
    const modal = useModal();
    const {updateRoute} = useRouting();

    const [nameLength, setNameLength] = useState(0);
    const nameLengthColor = nameLength > 255 ? 'text-red' : 'text-green';

    return (
        <Modal
            afterClose={() => {
                updateRoute('keycloak');
            }}
            cancelLabel=''
            okLabel='Save'
            size='lg'
            testId='keycloak-modal'
            title='Keycloak'
            onOk={() => {
                modal.remove();
                updateRoute('keycloak');
            }}
        >
        <section>
            <div className='mt-5'>
                <Toggle label='Enable Keycloak' size='lg' labelClasses='text-lg'  direction='rtl' toggleBg='green'/>
            </div>
            <div className='mt-10'>
                <TextField
                    hint={<div className='flex justify-between'><strong><span className={`${nameLengthColor}`}>{nameLength}</span> / 255</strong></div>}
                        maxLength={255}
                        placeholder='Keycloak Token URL'
                        title='Keycloak Token URL'
                        onChange={(e) => {
                        //handleNameInput(e);
                         setNameLength(e.target.value.length);
                        }}
                        //onKeyDown={() => clearError('name')}
                    />
            </div>
            <div className='mt-10'>
                <TextField
                    hint={<div className='flex justify-between'>Prefix of the roles to be applied to the user in Ghost</div>}
                        maxLength={10}
                        placeholder='ghost_'
                        title='Keycloak role prefix'
                        onChange={(e) => {
                        //handleNameInput(e);
                        }}
                        //onKeyDown={() => clearError('name')}
                    />
            </div>
            </section>
        </Modal>
    );
});

export default KeycloakDetailsModal;
