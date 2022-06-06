import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import { Container, LeftSide, LegendContainer, Legend, RightSide } from './styles'

interface IPieChartsProps {
    chartData: {
        name: string;
        value: number;
        percentage: number;
        color: string;
    }[];
}

const PieChartBox: React.FC<IPieChartsProps> = ({ chartData }) => (
    <Container>
        <LeftSide>
            <h2>Relação</h2>
            <LegendContainer>
                {
                    chartData.map((indicator) => (
                        <Legend key={indicator.name} color={indicator.color}>
                            <div>{indicator.percentage}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>
        </LeftSide>

        <RightSide>
            <ResponsiveContainer>
                <PieChart >
                    <Pie
                        data={chartData}
                        dataKey="value"
                        paddingAngle={4}
                        innerRadius={65}
                        outerRadius={100}
                        animationBegin={0}
                        animationDuration={700}
                        animationEasing='ease'
                        cornerRadius={2}
                        cx={200}
                    >
                        {
                            chartData.map((indicator) => (
                                <Cell key={indicator.name} fill={indicator.color} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </RightSide>
    </Container>
)

export default PieChartBox;