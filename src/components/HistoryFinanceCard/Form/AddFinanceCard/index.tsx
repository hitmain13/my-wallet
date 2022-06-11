import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { RiCloseLine } from 'react-icons/ri';

import {
    Container,
    Form,
    FormTitle,
    Label,
    Header,
    HeaderContent,
    Content,
    SelectLabel,
    FooterContent,
    DescriptionInput,
    Footer,
    Input,
    Button,
    CloseButton
} from './styles'

import getCurrentDate from '../../../../utils/getCurrentDate'
import { useModal } from '../../../../hooks/useModals'

import expenses from '../../../../repositories/expenses'
import gains from '../../../../repositories/gains'

const AddFinanceCardForm: React.FC = () => {
    //   {"description":"Energia elétrica",      "amount":"150.55","type":"saída","frequency":"recurrent","date":"2022-06-25"},

    const [title, setTitle] = useState('haha');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [frequency, setFrequency] = useState('');
    const [date, setDate] = useState(getCurrentDate());
    const [description, setDescription] = useState('');

    const { toggleModal, content } = useModal();

    useEffect(() => {
        if (content) {
            const { cardTitle, cardAmount, cardType, cardFrequency, cardDate } = content;
            setTitle(cardTitle);
            setAmount(cardAmount);
            setType(cardType);
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
            } else {
                gains.push({ ...newRelease })
                localStorage.setItem('@my-wallet:gains', JSON.stringify(gains));
            }
        } catch (err) { console.log(err) }
    }
    return (
        <Container>
            <Header>
                <FormTitle>Cadastrar</FormTitle>
                <CloseButton type="button" onClick={toggleModal}><RiCloseLine /></CloseButton>
            </Header>

            <Form onSubmit={handleAddBalanceItem}>
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
                    <Button type="submit">Registrar</Button>
                    <Button type="button" onClick={toggleModal}>Cancelar</Button>
                </Footer>
            </Form>
        </Container>
    )
}

export default AddFinanceCardForm;