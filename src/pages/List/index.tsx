import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import listMonths from '../../utils/months'

import { Container, Content, Filters } from './styles'

interface IData {
    description: string,
    amountFormatted: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC = () => {
    const [cardData, setCardData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [selectedFrequencyType, setSelectedFrequencyType] = useState(['recurrent', 'eventual'])

    const { balanceType } = useParams();

    const listDate = useMemo(() => {
        return balanceType === 'entry-balance' ? gains : expenses;
    }, [balanceType])

    const pageDatas = useMemo(() => {
        return balanceType === 'entry-balance' ? {
            title: 'Entradas',
            lineColor: '#34d058',
            listDate: gains
        } : {
            title: 'Saídas',
            lineColor: '#E44C4E',
            listDate: expenses
        }
    }, [balanceType])

    const months = useMemo(() => {
        return listMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    }, [])

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

    const handleFrequencyFilter = (frequency: string) => {
        const frequencyFiltered = selectedFrequencyType.findIndex(item => item === frequency)

        if (frequencyFiltered >= 0) {
            const isFiltered = selectedFrequencyType.filter(item => item !== frequency)
            setSelectedFrequencyType(isFiltered)
        } else {
            setSelectedFrequencyType((prev) => [...prev, frequency])
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch (err) {
            throw new Error('Invalid month value. Insert a acceptable value (0 - 24).')
        }
    }
    
    const handleYearSelected = (year: string) => {
        try {
            const parseMonth = Number(year);
            setYearSelected(parseMonth);
        }
        catch (err) {
            throw new Error('Invalid year value. Insert integer number.')
        }
    }

    useEffect(() => {
        const filteredAllDates = listDate.filter(currentCard => {
            const cardDate = new Date(currentCard.date)  // A cardData é devolvida com dia anterior da cardData real.
            cardDate.setDate(cardDate.getDate() + 1)    // É aplicada adição de +1 dia com o setDate para correção.
            Intl.DateTimeFormat('pt-br').format(cardDate)

            const month = cardDate.getMonth() + 1;
            const year = cardDate.getFullYear();

            return month === monthSelected && year === yearSelected && selectedFrequencyType.includes(currentCard.frequency)
        });

        const formattedDate = filteredAllDates.map(item => {
            return {
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'eventual' ? '#4E41F0' : '#E44C4E'
            }
        })
        setCardData(formattedDate);

    }, [listDate, monthSelected, yearSelected, cardData.length, selectedFrequencyType])

    return (
        <Container>
            <ContentHeader title={pageDatas.title} lineColor={pageDatas.lineColor}>
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

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequencyType.includes('recurrent') && 'tag-actived'}`}
                    onClick={() => handleFrequencyFilter('recurrent')}>
                    Recorrentes
                </button>

                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${selectedFrequencyType.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyFilter('eventual')}>
                    Eventuais
                </button>
            </Filters>

            <Content> {
                cardData.map((item, index) => (
                    <HistoryFinanceCard
                        key={index}
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