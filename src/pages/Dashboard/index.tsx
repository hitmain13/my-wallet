import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletCard from '../../components/WalletCard'

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listMonths from '../../utils/months'

import { Container, Content } from './styles'


const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    }, [])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];
        const allMoviments = [...expenses, ...gains];

        allMoviments.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        })
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })
    }, [])


    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch (err) {
            throw new Error('Invalid month value. Insert a acceptable value (0 - 24).')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseMonth = Number(year);
            setYearSelected(parseMonth);
        }
        catch (err) {
            throw new Error('Invalid year value. Insert integer number.')
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor='#4E92E2'>
                <SelectInput
                    options={months}
                    defaultValue={monthSelected}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                />
                <SelectInput
                    options={years}
                    defaultValue={yearSelected}
                    onChange={(e) => handleYearSelected(e.target.value)}
                />
            </ContentHeader>

            <Content>
                <WalletCard
                    title="SALDO"
                    amount={150.00}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='dollar'
                    color='#4E41F0'
                />

                <WalletCard
                    title="ENTRADAS"
                    amount={5000.00}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='arrowUp'
                    color='#F7931B'
                />

                <WalletCard
                    title="SAÍDAS"
                    amount={4850.00}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='arrowDown'
                    color='#E44C4E'
                />
            </Content>
        </Container>
    )
}

export default Dashboard;