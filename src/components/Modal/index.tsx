import React from 'react';

import {
    Container,
    Overlay,
    ModalContainer,
} from './styles';

import { useModal } from '../../hooks/useModals'

import AddFinanceCardForm from '../HistoryFinanceCard/Form/AddFinanceCard'

const Modal: React.FC = () => {
    const { modalVisible, toggleModal } = useModal();

    return (
        <Container>
            {modalVisible && (
                <Overlay onClick={toggleModal}>
                    <ModalContainer onClick={e => e.stopPropagation()}>
                        <AddFinanceCardForm/>
                    </ModalContainer>
                </Overlay>
            )}
        </Container>
    )
}

export default Modal;