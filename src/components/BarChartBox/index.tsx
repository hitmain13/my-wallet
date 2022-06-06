import React from 'react';

import formatCurrency from '../../utils/formatCurrency';

import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts';

import { Container, LeftSide, RightSide, LegendContainer, Legend } from './styles';

interface IBarChartProps {
    title: string,
    data: {
        name: string,
        amount: number,
        percentage: number,
        color: string
    }[],
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => (
    <Container>
        <LeftSide>
            <h2>{title}</h2>
            <LegendContainer>
                {
                    data.map((indicator) => (
                        <Legend key={indicator.name} color={indicator.color}>
                            <div>{indicator.percentage}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>
        </LeftSide>

        <RightSide>
            <ResponsiveContainer width={300}>
                <BarChart data={data}>
                    <Bar dataKey='amount' name="Valor">
                        {
                            data.map((indicator) => (
                                <Cell
                                    key={indicator.name}
                                    fill={indicator.color}
                                />
                            ))
                        }
                    </Bar>
                    <Tooltip
                        labelStyle={{ visibility: 'hidden' }}
                        contentStyle={{ backgroundColor: '#0000' }}
                        cursor={{ fill: 'none' }}
                        animationDuration={70}
                        formatter={(value: number) => formatCurrency(Number(value))}
                    />
                </BarChart>

            </ResponsiveContainer>

        </RightSide>
    </Container>
)

export default BarChartBox;