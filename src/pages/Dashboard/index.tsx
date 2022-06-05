import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletCard from '../../components/WalletCard'
import MessageBox from '../../components/MessageBox'
import PieChartBox from '../../components/PieChartBox'
import HistoryBox from '../../components/HistoryBox'

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import monthsList from '../../utils/months'

import happySVG from '../../assets/happy.svg'
import sadSVG from '../../assets/sad.svg'
import grinningSVG from '../../assets/grinning.svg'

import { Container, Content } from './styles'

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return monthsList.map((month, index) => {
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

    const totalExpense = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! It must be a number.')
                }
            }
        })
        return total;
    }, [monthSelected, yearSelected])

    const totalGain = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount);
                } catch {
                    throw new Error('Invalid amount! It must be a number.')
                }
            }
        })
        return total;
    }, [monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        return totalGain - totalExpense;
    }, [totalGain, totalExpense])

    const messageBox = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Sua carteira está negativa!",
                footerText: "Neste mês você gastou mais do que deveria. Revise suas despesas e tente cortar as contas não essenciais.",
                icon: sadSVG,
            }
        }
        else if (totalBalance === 0) {
            return {
                title: "Na traave!",
                description: "Você gastou exatamente o que ganhou!",
                footerText: "Considere guardar na próxima vez ou ficará sem o seu cafézinho.",
                icon: grinningSVG,
            }
        } else {
            return {
                title: "Muito bem!",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim! Seria interessante investir o seu saldo.",
                icon: happySVG
            }
        }

    }, [totalBalance, totalGain, totalExpense]);

    const relationExpensesVSGains = useMemo(() => {
        const total = totalGain + totalExpense;


        const gainsPercentage = (totalGain / total) * 100;
        const expensesPercentage = (totalExpense / total) * 100;

        const data = [{
            name: 'Entradas',
            value: totalGain,
            percentage: Number(gainsPercentage.toFixed(1)),
            color: "#E44C4E"
        }, {
            name: 'Saídas',
            value: totalExpense,
            percentage: Number(expensesPercentage.toFixed(1)),
            color: "#F7931B"
        }]
        return data;
    }, [totalGain, totalExpense]);

    const historyData = useMemo(() => {
        return monthsList.map((_, month) => {

            let gainAmount = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        gainAmount += Number(gain.amount);
                    } catch {
                        throw new Error('gainAmount is invalid. It must be a valid number.');
                    }
                }
            });

            let expenseAmount = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expensesMonth = date.getMonth();
                const expensesYear = date.getFullYear();

                if (expensesMonth === month && expensesYear === yearSelected) {
                    try {
                        expenseAmount += Number(expense.amount);
                    } catch {
                        throw new Error('expenseAmount is invalid. It must be a valid number.');
                    }
                }
            });

            return {
                monthNumber: month,
                month: monthsList[month].substr(0, 3),
                gainAmount,
                expenseAmount
            }
        })
            .filter((item) => {
                const currentMonth = new Date().getMonth()+1;
                const currentYear = new Date().getFullYear();

                return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
            })
    }, [yearSelected])

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch {
            throw new Error('Invalid month value. Insert a acceptable value (0 - 24).')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseMonth = Number(year);
            setYearSelected(parseMonth);
        }
        catch {
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
                    amount={totalBalance}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='dollar'
                    color='#4E41F0'
                />

                <WalletCard
                    title="ENTRADAS"
                    amount={totalGain}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='arrowUp'
                    color='#F7931B'
                />

                <WalletCard
                    title="SAÍDAS"
                    amount={totalExpense}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='arrowDown'
                    color='#E44C4E'
                />
                <MessageBox
                    title={messageBox.title}
                    description={messageBox.description}
                    footerText={messageBox.footerText}
                    icon={messageBox.icon}
                />

                <PieChartBox data={relationExpensesVSGains} />

                <HistoryBox
                    data={historyData}
                    lineColorAmountGains="#F7931B"
                    lineColorAmountExpenses="#E44C4E"
                />
            </Content>
        </Container>
    )
}

export default Dashboard;