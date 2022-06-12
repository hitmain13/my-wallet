// Last update: 08/jun/2022.
// TODO: Refactoring the whole page desfragmenting as components.
// Create subfolders and insert their component contents.

import React, { useState, useMemo, useCallback } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletCard from '../../components/WalletCard';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import monthsList from '../../utils/months';

import happySVG from '../../assets/happy.svg';
import sadSVG from '../../assets/sad.svg';
import grinningSVG from '../../assets/grinning.svg';

import { Container, Content } from './styles';

type IReleaseProps = {
    title: string,
    amount: string,
    type: string,
    frequency: string,
    date: string,
    description: string
}[]

const Dashboard: React.FC = () => {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const gainData = localStorage.getItem('@my-wallet:gains')
    if (gainData === null) localStorage.setItem('@my-wallet:gains', JSON.stringify([]))
    const storedGains = localStorage.getItem('@my-wallet:gains') || null
    const [gains] = useState<IReleaseProps>(storedGains ? JSON.parse(storedGains) : {})

    const expenseData = localStorage.getItem('@my-wallet:expenses')
    if (expenseData === null) localStorage.setItem('@my-wallet:expenses', JSON.stringify([]))
    const storedExpenses = localStorage.getItem('@my-wallet:expenses') || null
    const [expenses] = useState<IReleaseProps>(storedExpenses ? JSON.parse(storedExpenses) : {})

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
        }
        else if (totalGain === 0 && totalExpense === 0) {
            return {
                title: "Op's!",
                description: "Neste mês não há registros de entradas e saídas.",
                footerText: "Parece que não fez nenhum registro no mês e ano selecionado.",
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

    const pieChartRelationExpensesVSGains = useMemo(() => {
        const total = totalGain + totalExpense;

        const gainsPercentage = Number(((totalGain / total) * 100).toFixed(1));
        const expensesPercentage = Number(((totalExpense / total) * 100).toFixed(1));

        const data = [{
            name: 'Entradas',
            value: totalGain,
            percentage: gainsPercentage ? gainsPercentage : 0,
            color: "#E44C4E"
        },
        {
            name: 'Saídas',
            value: totalExpense,
            percentage: expensesPercentage ? expensesPercentage : 0,
            color: "#F7931B"
        }]
        return data;
    }, [totalGain, totalExpense]);

    const historyChartData = useMemo(() => {
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
                const currentMonth = new Date().getMonth();
                const currentYear = new Date().getFullYear();

                return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
            })
    }, [yearSelected])

    const historyLegendData = useMemo(() => {
        let totalGainAmount = 0;
        let totalExpenseAmount = 0;

        monthsList.map((_, month) => {

            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMonth === month && gainYear === yearSelected) {
                    try {
                        totalGainAmount += Number(gain.amount);
                    } catch {
                        throw new Error('totalGainAmount is invalid. It must be a valid number.');
                    }
                }
            });

            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expensesMonth = date.getMonth();
                const expensesYear = date.getFullYear();

                if (expensesMonth === month && expensesYear === yearSelected) {
                    try {
                        totalExpenseAmount += Number(expense.amount);
                    } catch {
                        throw new Error('totalExpenseAmount is invalid. It must be a valid number.');
                    }
                }
            });
        })

        const totalAmount = totalGainAmount + totalExpenseAmount;
        const gainPercentage = Number(((totalGainAmount / totalAmount) * 100).toFixed(1));
        const expensePercentage = Number(((totalExpenseAmount / totalAmount) * 100).toFixed(1));

        return [
            {
                name: "Entradas",
                percentage: gainPercentage ? gainPercentage : 0,
                color: "#F7931B",
            },
            {
                name: "Saídas",
                percentage: expensePercentage ? expensePercentage : 0,
                color: "#E44C4E"
            }
        ]
    }, [yearSelected])

    const relationExpensevesRecurrentVSEventual = useMemo(() => {
        let recurrentAmount = 0;
        let eventualAmount = 0;

        expenses
            .filter((expense) => {
                const date = new Date(expense.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                
                return month === monthSelected && year === yearSelected
            })
            .forEach((expense) => {
                expense.frequency === 'recurrent' ?
                    recurrentAmount += Number(expense.amount)
                    : eventualAmount += Number(expense.amount)
            })

        const total = recurrentAmount + eventualAmount;
        const recurrentPercentage = Number(((recurrentAmount / total) * 100).toFixed(1));
        const eventualPercentage = Number(((eventualAmount / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: recurrentAmount,
                percentage: recurrentPercentage ? recurrentPercentage : 0,
                color: '#E44C4E'
            },
            {
                name: 'Eventuais',
                amount: eventualAmount,
                percentage: eventualPercentage ? eventualPercentage : 0,
                color: '#4E41F0'
            }
        ]
    }, [monthSelected, yearSelected])

    const relationGainsRecurrentVSEventual = useMemo(() => {
        let recurrentAmount = 0;
        let eventualAmount = 0;

        gains
            .filter((gain) => {
                const date = new Date(gain.date);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;

                return month === monthSelected && year === yearSelected
            })
            .forEach((gain) => {
                gain.frequency === 'recurrent' ?
                    recurrentAmount += Number(gain.amount)
                    : eventualAmount += Number(gain.amount)
            })

        const total = recurrentAmount + eventualAmount;
        const recurrentPercentage = Number(((recurrentAmount / total) * 100).toFixed(1));
        const eventualPercentage = Number(((eventualAmount / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: recurrentAmount,
                percentage: recurrentPercentage ? recurrentPercentage : 0,
                color: '#E44C4E'
            },
            {
                name: 'Eventuais',
                amount: eventualAmount,
                percentage: eventualPercentage ? eventualPercentage : 0,
                color: '#4E41F0'
            }
        ]
    }, [monthSelected, yearSelected])

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch {
            throw new Error('Invalid month value. Insert a acceptable value (0 - 24).')
        }
    },[])

    const handleYearSelected = useCallback((year: string) => {
        try {
            const parseMonth = Number(year);
            setYearSelected(parseMonth);
        }
        catch {
            throw new Error('Invalid year value. Insert integer number.')
        }
    },[]);

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
                    color='#3fb51095'
                />

                <WalletCard
                    title="ENTRADAS"
                    amount={totalGain}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='arrowUp'
                    color='#c78e23cc'
                />

                <WalletCard
                    title="SAÍDAS"
                    amount={totalExpense}
                    footerLabel="atualizado com base nas entradas e saídas."
                    icon='arrowDown'
                    color='#bd3b3eb7'
                />

                <MessageBox
                    title={messageBox.title}
                    description={messageBox.description}
                    footerText={messageBox.footerText}
                    icon={messageBox.icon}
                />

                <PieChartBox chartData={pieChartRelationExpensesVSGains} />

                <HistoryBox
                    data={historyChartData}
                    legendData={historyLegendData}
                    lineColorAmountGains="#F7931B"
                    lineColorAmountExpenses="#E44C4E"
                />

                <BarChartBox
                    title="Saídas"
                    data={relationExpensevesRecurrentVSEventual}
                />
                
                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVSEventual}
                />
            </Content>
        </Container>
    )
}

export default Dashboard;