import React, { useState } from 'react';

import { Container, Tag, TagContainer, EditButton, DeleteButton } from './styles'

interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({ tagColor, title, subtitle, amount }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleExpandedItem = () => { setIsExpanded(!isExpanded); console.log(isExpanded); }
    return (
        <Container>
            <EditButton isExpanded={isExpanded}>Edit</EditButton>
            <DeleteButton isExpanded={isExpanded}>Remove</DeleteButton>
            <TagContainer onClick={handleExpandedItem} isExpanded={isExpanded}>
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