import React, { useEffect } from 'react';

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
    cardAmountFormatted: string
    cardType: string
    cardFrequency: string
    cardDate: string
    cardDateFormatted: string
    cardIndex: number
    modalType?: boolean | undefined
}

const ModalContext = React.createContext<IModalContextProps>({} as IModalContextProps)

export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [content, setContent] = React.useState<any>('')
    const toggleModal = () => setModalVisible(!modalVisible)
    const defineContent = (props: any) => setContent(props)

    useEffect(() => {
        modalVisible === false && setContent('')
    }, [modalVisible])

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