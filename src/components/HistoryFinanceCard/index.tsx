import React, { useState } from 'react';

import { Container, Tag, TagContainer, EditButton, DeleteButton } from './styles'

import { MdEdit, MdDeleteForever } from 'react-icons/md'

import { useModal } from '../../hooks/useModals'

interface IHistoryFinanceCardProps {
    cardTitle: string
    cardAmount: string
    cardType: string
    cardFrequency: string
    cardDate: string
    tagColor: string
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({ cardTitle, cardAmount, cardType, cardFrequency, cardDate, tagColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { toggleModal, defineContent } = useModal();

    const handleExpandedItem = () => setIsExpanded(!isExpanded)

    return (
        <Container>
            <EditButton
                isExpanded={isExpanded}
                color='#4E41F0'
                onClick={() => {
                    toggleModal();
                    defineContent({ cardTitle, cardAmount, cardType, cardFrequency, cardDate })
                }}
            >
                <MdEdit />
            </EditButton>
            <DeleteButton
                isExpanded={isExpanded}
                color='#E44C4E'>
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
                    <small>{cardDate}</small>
                </div>
                <h3>{cardAmount}</h3>
            </TagContainer>
        </Container>
    )
}

export default HistoryFinanceCard;