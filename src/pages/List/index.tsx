import React, { useMemo, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

import { Container, Content, Filters } from './styles'

interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC = () => {
    const months = [
        { value: 9, label: 'Setembro' },
        { value: 8, label: 'Agosto' },
        { value: 7, label: 'Julho' }
    ]

    const years = [
        { value: 2020, label: 2020 },
        { value: 2019, label: 2019 },
        { value: 2018, label: 2018 }
    ]

    const [data, setData] = useState<IData[]>([]);

    const { type } = useParams();
    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    }, [type])

    useEffect(() => {
        const response = listData.map(item => {
            const id =+ 1
            return {
                id: String(listData.indexOf(item)),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(response);
    }, [type])

    const titleOptions = useMemo(() => {
        return type === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#34d058'
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E'
        }
    }, [type])

    return (
        <Container>
            <ContentHeader title={titleOptions.title} lineColor={titleOptions.lineColor}>
                <SelectInput options={months} />
                <SelectInput options={years} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>

                <button
                    type="button"
                    className="tag-filter tag-filter-eventual">
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />
                    ))

                }
            </Content>

        </Container>
    )
}

export default List;