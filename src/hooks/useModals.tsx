import React from 'react';

interface IModalContextProps {
    modalVisible: boolean
    toggleModal: () => void
    content: React.ReactNode
}

type Props = {
    children?: React.ReactNode
}
const ModalContext = React.createContext<IModalContextProps>({} as IModalContextProps)

export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const toggleModal = () => setModalVisible(!modalVisible)

    const content = children
    return (
        <ModalContext.Provider value={{
            modalVisible,
            toggleModal,
            content
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = (): IModalContextProps => React.useContext(ModalContext)