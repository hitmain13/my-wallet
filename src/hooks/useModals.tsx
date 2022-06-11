import React from 'react';

interface IModalContextProps {
    modalVisible: boolean
    toggleModal: () => void
    content: IDefineContentProps
    defineContent: (props: IDefineContentProps) => void
}

type Props = {
    children?: React.ReactNode
}

type IDefineContentProps = {
    cardTitle: string
    cardAmount: string
    cardType: string
    cardFrequency: string
    cardDate: string
}

const ModalContext = React.createContext<IModalContextProps>({} as IModalContextProps)

export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [content, setContent] = React.useState<any>()
    const toggleModal = () => setModalVisible(!modalVisible)
    const defineContent = (props: any) => {
        console.log('useModal: ',props)
        setContent(props)
    }
    

    return (
        <ModalContext.Provider value={{
            modalVisible,
            toggleModal,
            content,
            defineContent
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = (): IModalContextProps => React.useContext(ModalContext)