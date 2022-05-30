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

    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

    const { type } = useParams();
    const listDate = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    }, [type])

    const months = [
        { value: 9, label: 'Setembro' },
        { value: 8, label: 'Agosto' },
        { value: 1, label: 'Janeiro' },
        { value: 2, label: 'Fevereiro' },
        { value: 5, label: 'Maio' },
        { value: 6, label: 'Junho' },
        { value: 4, label: 'Abril' },
        { value: 7, label: 'Julho' }
    ]

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listDate.forEach(item => {
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
    }, [listDate])

    useEffect(() => {
        const filteredAllDates = listDate.filter(currenCard => {
            const cardDate = new Date(currenCard.date) // A data é devolvida com dia anterior da data real.
            cardDate.setDate(cardDate.getDate() + 1) // É aplicada adição de +1 dia com o setDate para correção.
            Intl.DateTimeFormat('pt-br').format(cardDate)

            const month = String(cardDate.getMonth() + 1);
            const year = String(cardDate.getFullYear());

            return month === monthSelected && year === yearSelected
        });

        const formattedDate = filteredAllDates.map(item => {
            return {
                id: String(listDate.indexOf(item)),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(formattedDate);
        console.log(formattedDate)

    }, [listDate, monthSelected, yearSelected, data.length])
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
                <SelectInput
                    options={months}
                    defaultValue={monthSelected}
                    onChange={(e) => setMonthSelected(e.target.value)}
                />
                <SelectInput
                    options={years}
                    defaultValue={yearSelected}
                    onChange={(e) => setYearSelected(e.target.value)}
                />
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

            <Content> {
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