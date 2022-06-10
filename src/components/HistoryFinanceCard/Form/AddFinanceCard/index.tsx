import React, { useState } from 'react';

import { RiCloseLine } from 'react-icons/ri'

import { Container, Form, FormTitle, Label, Header, HeaderContent, Content, SelectLabel, Select, FooterContent, DescriptionInput, Footer, Input, Button, CloseButton } from './styles'

const AddFinanceCardForm: React.FC = () => {
    //   {"description":"Energia elétrica",      "amount":"150.55","type":"saída","frequency":"recurrent","date":"2022-06-25"},
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState<number>();

    const newRelease = [

    ]

    return (
        <Container>
            <Header>
                <FormTitle>Cadastrar</FormTitle>
                <CloseButton><RiCloseLine /></CloseButton>
            </Header>

            <Form>
                <HeaderContent>
                    <Label>Titulo</Label>
                    <Input type="text" placeholder="Digite o título" onChange={(e) => setTitle(String(e.target.value))}/>
                </HeaderContent>

                <Content>
                    <SelectLabel>Tipo
                        <select>
                            <option key='Selecione...' value='gain'>Selecione...</option>
                            <option key='Entrada' value='gain'>Entrada</option>
                            <option key='Saída' value='expense'>Saída</option>
                        </select>
                    </SelectLabel>
                    <SelectLabel>Data
                        <input type='date' />
                    </SelectLabel>
                    <SelectLabel>Frequência
                        <select>
                            <option key='Selecione...' value='gain'>Selecione...</option>
                            <option key='Recorrente' value='recurrent'>Recorrente</option>
                            <option key='Eventual' value='eventual'>Eventual</option>
                        </select>
                    </SelectLabel>
                    <SelectLabel>Valor<Input type="number" step={1.00} value={value} onChange={(e) => setValue(Number(e.target.value))}/></SelectLabel>
                </Content>

                <FooterContent>
                    <Label>Descrição</Label>
                    <DescriptionInput type="text" placeholder="Digite o título" onChange={(e) => setDescription(String(e.target.value))}/>
                </FooterContent>

                <Footer>
                    <Button>Registrar</Button>
                    <Button>Cancelar</Button>
                </Footer>
            </Form>
        </Container>
    )
}

export default AddFinanceCardForm;