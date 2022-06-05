import React from 'react';

import { Container, CustomTooltip, TooltipLabel } from './styles'

import formatCurrency from '../../utils/formatCurrency'

import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts'

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
    const CustomTooltip = (data: any) => {
        const { active, payload, label } = data;
        if (active && payload && payload.length) {
          return (
            <div style={{ backgroundColor: '#FFF'}}>
              <p style={{fontSize: '20px', color: '#000'}}>{`${payload[0].value}`} / {`${payload[1].value}`} / {`${label}`}</p>
            </div>
          );
        }
        return null;
      };

    return (
        <Container>
            <h2>Histórico de saldo</h2>

            <ResponsiveContainer width="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }} >
                    <CartesianGrid strokeDasharray='5 3' stroke='#cecece' />
                    <XAxis dataKey='month' />
                    <Tooltip
                        offset={30}
                        animationEasing='linear'
                        animationDuration={50}
                        content={<CustomTooltip/>}
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
        </Container>
    )
}

export default HistoryBox;