import React from 'react';
import { MdSpaceDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md'

import logoImg from '../../assets/logo.svg';

import {
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink
} from './styles'

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>MINHA CARTEIRA</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink to='/dashboard'>
                    <MdSpaceDashboard />
                    DashBoard
                </MenuItemLink>

                <MenuItemLink to='/list/entry-balance'>
                    <MdArrowUpward/>
                    Entradas
                </MenuItemLink>

                <MenuItemLink to='/list/exit-balance'>
                    <MdArrowDownward/>
                    Saídas
                </MenuItemLink>

                <MenuItemLink to='#'>
                    <MdExitToApp/>
                    Sair
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}

export default Aside;