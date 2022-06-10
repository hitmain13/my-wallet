import React, { useState } from 'react';

import { Container, Tag, TagContainer, EditButton, DeleteButton } from './styles'

import { MdEdit, MdDeleteForever } from 'react-icons/md'

interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({ tagColor, title, subtitle, amount }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleExpandedItem = () => { setIsExpanded(!isExpanded); }
    return (
        <Container>
            <EditButton isExpanded={isExpanded} color='#4E41F0' onClick={() => console.log(title, subtitle, amount)}><MdEdit /></EditButton>
            <DeleteButton isExpanded={isExpanded} color='#E44C4E'><MdDeleteForever /></DeleteButton>
            <TagContainer
                onClick={handleExpandedItem}
                isExpanded={isExpanded}
                color=''
            >
                <Tag color={tagColor} />
                <div>
                    <span>{title}</span>
                    <small>{subtitle}</small>
                </div>
                <h3>{amount}</h3>
            </TagContainer>
        </Container>
    )
}

export default HistoryFinanceCard;