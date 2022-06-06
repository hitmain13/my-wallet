import React from 'react';

import { Container, ChartContainer, Header, LegendContainer, Legend } from './styles'

import formatCurrency from '../../utils/formatCurrency'
import useWindowDimensions from '../../hooks/useWindowDimensions'

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface IHistoryBoxProps {
    data: {
        month: string;
        gainAmount: number;
        expenseAmount: number;
    }[],
    legendData: {
        name: string,
        percentage: number,
        color: string,
    }[],
    lineColorAmountGains: string;
    lineColorAmountExpenses: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({ data, legendData, lineColorAmountGains, lineColorAmountExpenses }) => {

    const higherAmount = () => data.map((item) => item.gainAmount > item.expenseAmount ? item.gainAmount : item.expenseAmount)

    const { width } = useWindowDimensions();

    return (
        <Container>
            <Header>
                <h2>Histórico de saldo</h2>
                <LegendContainer>
                    {
                        legendData.map((item) => (
                            <Legend key={item.name}
                                color={item.color}>
                                <div>{item.percentage}%</div>
                                <span>{item.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </Header>

            <ChartContainer>
                <ResponsiveContainer width={width - 300}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 20,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray='5 3' stroke='#cecece' />
                        <YAxis dataKey={higherAmount} />
                        <XAxis dataKey='month' />
                        <Tooltip
                            filterNull={false}
                            contentStyle={{ backgroundColor: '#0000' }}
                            offset={5}
                            animationDuration={70}
                            formatter={(value: number) => formatCurrency(Number(value))}
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