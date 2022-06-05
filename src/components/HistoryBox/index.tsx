import React, { useMemo } from 'react';

import { Container, ChartContainer, Header, LegendContainer, Legend } from './styles'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface IHistoryBoxProps {
    data: {
        month: string;
        gainAmount: number;
        expenseAmount: number;
    }[],
    lineColorAmountGains: string;
    lineColorAmountExpenses: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({ data, lineColorAmountGains, lineColorAmountExpenses }) => {

    const higherAmount = () => data.map((item) => item.gainAmount > item.expenseAmount ? item.gainAmount : item.expenseAmount)

    const responsiveChart = useMemo(() => {
        return window.screen.width
    }, [window.screen.width])
    console.log(window.screen.width)

    return (
        <Container>
            <Header>
                <h2>Histórico de saldo</h2>
                <LegendContainer>
                    <Legend color={lineColorAmountGains}>
                        <div>30%</div>
                        <span>Entradas</span>
                    </Legend>
                    <Legend color={lineColorAmountExpenses}>
                        <div>30%</div>
                        <span>Saídas</span>
                    </Legend>
                </LegendContainer>
            </Header>

            <ChartContainer>
                <ResponsiveContainer width='100%' height={300}>
                    <LineChart
                        width={window.screen.width}
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 20,
                            bottom: 5
                        }} >
                        <CartesianGrid strokeDasharray='5 3' stroke='#cecece' />
                        <YAxis dataKey={higherAmount} />
                        <XAxis dataKey='month' />
                        <Tooltip
                            filterNull={false}
                            contentStyle={{ backgroundColor: '#0000' }}
                            offset={5}
                            animationDuration={70}
                            active={true}
                        // formatter={(value) => formatCurrency(Number(value))}
                        />
                        <Line
                            type='monotone'
                            dataKey='gainAmount'
                            name="Entradas"
                            stroke={lineColorAmountGains}
                            strokeWidth={4}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type='monotone'
                            dataKey='expenseAmount'
                            name="Saídas"
                            stroke={lineColorAmountExpenses}
                            strokeWidth={4}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Container >
    )
}

export default HistoryBox;