import React, { useMemo } from 'react';

import dollarSVG from '../../assets/dollar.svg'
import arrowUpSVG from '../../assets/arrow-up.svg'
import arrowDownSVG from '../../assets/arrow-down.svg'

import { Container } from './styles';

interface IWalletCardProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dollar' | 'arrowUp' | 'arrowDown';
    color: string;
}

const WalletCard: React.FC<IWalletCardProps> = ({ title, amount, footerLabel, icon, color }) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dollar': return dollarSVG
            case 'arrowUp': return arrowUpSVG
            case 'arrowDown': return arrowDownSVG
        }
    }, [])

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>{amount}</h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    )
}

export default WalletCard;