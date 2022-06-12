import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { RiCloseLine } from 'react-icons/ri';

import {
    Container, Form, FormTitle, Label, Header, HeaderContent, Content, SelectLabel, FooterContent, DescriptionInput, Footer, Input, Button, CloseButton
} from './styles'

import getCurrentDate from '../../../../utils/getCurrentDate'
import { useModal } from '../../../../hooks/useModals'

type IReleaseProps = {
    title: string,
    amount: string,
    type: string,
    frequency: string,
    date: string,
    description: string
}[]

const AddFinanceCardForm: React.FC = () => {
    // [{"title":"Salário","amount":"1300.52","type":"gain","frequency":"recurrent","date":"2022-06-19"}]
    const [title, setTitle] = useState('teste');
    const [amount, setAmount] = useState('24');
    const [type, setType] = useState('gain');
    const [newType, setNewType] = useState('');
    const [frequency, setFrequency] = useState('eventual');
    const [date, setDate] = useState(getCurrentDate());
    const [description, setDescription] = useState('');

    const storedGains = localStorage.getItem('@my-wallet:gains') || null
    const [gains, setGains] = useState<IReleaseProps>(storedGains ? JSON.parse(storedGains) : {})
    const storedExpenses = localStorage.getItem('@my-wallet:expenses') || null
    const [expenses, setExpenses] = useState<IReleaseProps>(storedExpenses ? JSON.parse(storedExpenses) : {})

    const { toggleModal, content } = useModal();
    const { modalType, cardIndex } = content;

    useEffect(() => {
        if (content) {
            const { cardTitle, cardAmount, cardType, cardFrequency, cardDate } = content;
            setTitle(cardTitle);
            setAmount(cardAmount);
            setNewType(cardType);
            setFrequency(cardFrequency);
            setDate(cardDate);
        }
    }, [content])

    const newRelease = {
        "title": title,
        "amount": amount,
        "type": type,
        "frequency": frequency,
        "date": date,
        "description": description
    }

    const handleAddBalanceItem = () => {
        try {
            if (type === 'expense') {
                expenses.push({ ...newRelease })
                localStorage.setItem('@my-wallet:expenses', JSON.stringify(expenses));
                setExpenses(expenses)
            } else {
                gains.push({ ...newRelease })
                localStorage.setItem('@my-wallet:gains', JSON.stringify(gains));
                setGains(gains)
            }
        } catch (err) { console.log(err) }
    }

    const handleEditBalanceItem = () => {
        try {
            if (type === 'expense' && newType !== type) {
                gains.splice(cardIndex, 1)
                expenses.push({ ...newRelease })
                localStorage.setItem('@my-wallet:expenses', JSON.stringify(expenses));
                localStorage.setItem('@my-wallet:gains', JSON.stringify(gains));
                setExpenses(expenses)
            } else if (type === 'gain' && newType !== type) {
                expenses.splice(cardIndex, 1)
                gains.push({ ...newRelease })
                localStorage.setItem('@my-wallet:expenses', JSON.stringify(expenses));
                localStorage.setItem('@my-wallet:gains', JSON.stringify(gains));
                setExpenses(gains)
            } else if (type === 'expense' && type === newType) {
                expenses.splice(cardIndex, 1)
                expenses.push({ ...newRelease })
                localStorage.setItem('@my-wallet:expenses', JSON.stringify(expenses));
                setExpenses(expenses)
            } else if (type === 'gain' && type === newType) {
                gains.splice(cardIndex, 1)
                gains.push({ ...newRelease })
                localStorage.setItem('@my-wallet:gains', JSON.stringify(gains));
                setExpenses(gains)
            }
        } catch (err) { console.log(err) }
    }

    return (
        <Container>
            <Header>
                <FormTitle>{modalType ? 'Editar' : 'Cadastrar'}</FormTitle>
                <CloseButton type="button" onClick={toggleModal}><RiCloseLine /></CloseButton>
            </Header>

            <Form onSubmit={modalType ? handleEditBalanceItem : handleAddBalanceItem}>
                <HeaderContent>
                    <Label>Titulo</Label>
                    <Input
                        type="text"
                        placeholder="Digite o título"
                        value={title}
                        required onChange={(e) => setTitle(String(e.target.value))}
                    />
                </HeaderContent>

                <Content>
                    <SelectLabel>Tipo
                        <select value={type} required onChange={(e) => setType(e.target.value)}>
                            <option disabled value='' >Selecione...</option>
                            <option key='Entrada' value='gain'>Entrada</option>
                            <option key='Saída' value='expense'>Saída</option>
                        </select>
                    </SelectLabel>
                    <SelectLabel>Data
                        <input
                            type='date'
                            value={date}
                            required onChange={(e) => setDate(e.target.value)}
                        />
                    </SelectLabel>
                    <SelectLabel>Frequência
                        <select value={frequency} required onChange={(e) => setFrequency(e.target.value)}>
                            <option disabled value=''>Selecione...</option>
                            <option key='Recorrente' value='recurrent'>Recorrente</option>
                            <option key='Eventual' value='eventual'>Eventual</option>
                        </select>
                    </SelectLabel>
                    <SelectLabel>Valor
                        <NumberFormat
                            prefix="R$ "
                            placeholder="R$ 0,00"
                            thousandSeparator='.'
                            decimalSeparator=","
                            isNumericString
                            value={amount}
                            required onValueChange={(values) => setAmount(values.value)}
                        />
                    </SelectLabel>
                </Content>

                <FooterContent>
                    <Label>Descrição</Label>
                    <DescriptionInput
                        type="text"
                        placeholder="Digite a descrição"
                        onChange={(e) => setDescription(String(e.target.value))} />
                </FooterContent>

                <Footer>
                    <Button type="submit">{modalType ? 'Editar' : 'Registrar'}</Button>
                    <Button type="button" onClick={toggleModal}>Cancelar</Button>
                </Footer>
            </Form>
        </Container>
    )
}

export default AddFinanceCardForm;