import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import { Container, LeftSide, LegendContainer, Legend, RightSide } from './styles'

import useWindowDimensions from '../../hooks/useWindowDimensions'

interface IPieChartsProps {
    chartData: {
        name: string;
        value: number;
        percentage: number;
        color: string;
    }[];
}

const PieChartBox: React.FC<IPieChartsProps> = ({ chartData }) => {
    const { width } = useWindowDimensions();
    let innerRadius = 65;
    let outerRadius = 100;
    if (width < 768) { innerRadius = 35; outerRadius = 60;}
    return (
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
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            animationBegin={0}
                            animationDuration={700}
                            animationEasing='ease'
                            cornerRadius={2}
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
}

export default PieChartBox;