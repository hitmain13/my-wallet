// Last update: 08/jun/2022.
// TODO: Refactoring the whole page desfragmenting as components.
// Create subfolders and insert their components content.

import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import dateFormat from 'dateformat'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import listMonths from '../../utils/months'

import { Container, Content, Filters } from './styles'

interface IData {
    title: string
    amount: string
    amountFormatted: string
    type: string
    frequency: string
    date: string
    dateFormatted: string
    tagColor: string
}

type IReleaseProps = {
    title: string,
    amount: string,
    type: string,
    frequency: string,
    date: string,
    description: string
}[]

const List: React.FC = () => {
    const gainData = localStorage.getItem('@my-wallet:gains')
    if (gainData === null) localStorage.setItem('@my-wallet:gains', JSON.stringify([]))
    const storedGains = localStorage.getItem('@my-wallet:gains') || null
    const [gains] = useState<IReleaseProps>(storedGains ? JSON.parse(storedGains) : {})

    const expenseData = localStorage.getItem('@my-wallet:expenses')
    if (expenseData === null) localStorage.setItem('@my-wallet:expenses', JSON.stringify([]))
    const storedExpenses = localStorage.getItem('@my-wallet:expenses') || null
    const [expenses] = useState<IReleaseProps>(storedExpenses ? JSON.parse(storedExpenses) : {})

    const [cardData, setCardData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [selectedFrequencyType, setSelectedFrequencyType] = useState(['recurrent', 'eventual'])

    const { balanceType } = useParams();

    const listDate = useMemo(() => {
        return balanceType === 'entry-balance' ? gains : expenses;
    }, [balanceType, expenses, gains])

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
    }, [balanceType, expenses, gains])

    const months = useMemo(() => {
        return listMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }})
    }, [])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listDate.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }})
        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }})
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
            let cardDate = new Date(currentCard.date)  // A cardDate é devolvida com dia anterior da cardDate real.
            cardDate.setDate(cardDate.getDate() + 1)     // É aplicada adição de +1 dia com o setDate para correção.
            Intl.DateTimeFormat('pt-br').format(cardDate)

            const month = cardDate.getMonth() + 1;
            const year = cardDate.getFullYear();

            return month === monthSelected && year === yearSelected && selectedFrequencyType.includes(currentCard.frequency)
        });

        const formattedDate = filteredAllDates.map(item => {
            return {
                title: item.title,
                amount: item.amount,
                amountFormatted: formatCurrency(Number(item.amount)),
                type: item.type,
                frequency: item.frequency,
                date: item.date,
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
                    onChange={(e) => handleMonthSelected(e.target.value)}/>
                <SelectInput
                    options={years}
                    defaultValue={yearSelected}
                    onChange={(e) => handleYearSelected(e.target.value)}/>
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
                        cardTitle={item.title}
                        cardAmountFormatted={item.amountFormatted}
                        cardAmount={item.amount}
                        cardType={item.type}
                        cardFrequency={item.frequency}
                        cardDate={item.date}
                        cardDateFormatted={item.dateFormatted}
                        cardIndex={index}
                        tagColor={item.tagColor}
                    />
                ))
            }
            </Content>
        </Container>
    )
}

export default List;