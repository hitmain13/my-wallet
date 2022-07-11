import React, { useState } from 'react';

import { Container, Tag, TagContainer, EditButton, DeleteButton } from './styles'

import { MdEdit, MdDeleteForever } from 'react-icons/md'

import { useModal } from '../../hooks/useModals'

interface IHistoryFinanceCardProps {
    cardTitle: string
    cardAmount: string
    cardAmountFormatted: string
    cardType: string
    cardFrequency: string
    cardDate: string
    cardDateFormatted: string
    cardIndex: number
    tagColor: string
}

type IReleaseProps = {
    title: string,
    amount: string,
    type: string,
    frequency: string,
    date: string,
    description: string
}[]

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    cardTitle, cardAmount, cardAmountFormatted, cardType, cardFrequency, cardDate, cardDateFormatted, cardIndex, tagColor
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { toggleModal, defineContent } = useModal();

    const storedGains = localStorage.getItem('@my-wallet:gains') || null
    const [gains, setGains] = useState<IReleaseProps>(storedGains ? JSON.parse(storedGains) : {})

    const storedExpenses = localStorage.getItem('@my-wallet:expenses') || null
    const [expenses, setExpenses] = useState<IReleaseProps>(storedExpenses ? JSON.parse(storedExpenses) : {})

    const handleExpandedItem = () => setIsExpanded(!isExpanded)

    const modalType = true

    const handleCardDelete = () => {
        if (cardType === 'expense') {
            expenses.splice(cardIndex, 1)
            localStorage.setItem('@my-wallet:expenses', JSON.stringify(expenses))
            setExpenses(expenses)
        } else {
            gains.splice(cardIndex, 1)
            localStorage.setItem('@my-wallet:gains', JSON.stringify(gains))
            setGains(gains)
        }
        window.location.reload()
    }
    
    return (
        <Container>
            <EditButton
                isExpanded={isExpanded}
                color='#4E41F0'
                onClick={() => {
                    toggleModal();
                    defineContent({ cardTitle, cardAmount, cardAmountFormatted, cardType, cardFrequency, cardDate, cardDateFormatted, cardIndex, modalType })
                }}
            >
                <MdEdit />
            </EditButton>
            <DeleteButton
                isExpanded={isExpanded}
                color='#E44C4E'
                onClick={handleCardDelete}>
                <MdDeleteForever />
            </DeleteButton>
            <TagContainer
                onClick={handleExpandedItem}
                isExpanded={isExpanded}
                color=''
            >
                <Tag color={tagColor} />
                <div>
                    <span>{cardTitle}</span>
                    <small>{cardDateFormatted}</small>
                </div>
                <h3>{cardAmountFormatted}</h3>
            </TagContainer>
        </Container>
    )
}

export default HistoryFinanceCard;