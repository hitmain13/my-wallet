import React, { useMemo } from 'react';

import CountUp from 'react-countup';

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
            case 'dollar': return dollarSVG;
            case 'arrowUp': return arrowUpSVG;
            case 'arrowDown': return arrowDownSVG;
            default: return undefined;
        }
    }, [])

    return (
        <Container color={color}>
            <span><strong>{title}</strong></span>
            <h1>
                <strong>R$ </strong>
                <CountUp
                    end={amount}
                    separator="."
                    decimal=","
                    decimals={2}
                    duration={1}
                    useEasing={true}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    )
}

export default WalletCard;