import React, { useState } from 'react';
import { MdSpaceDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu } from 'react-icons/md'

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/auth'

import {
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    ToggleMenu
} from './styles'

const Aside: React.FC = () => {
    const [toggleMenuIsOpenned, setToggleMenuIsOpenned] = useState(false);
    const { signOut } = useAuth();
    const handleToggleMenu = () => {
        setToggleMenuIsOpenned(!toggleMenuIsOpenned);
    }
    return (
        <Container menuIsOpen={toggleMenuIsOpenned}>
            <Header>
                <ToggleMenu
                    menuIsOpen={toggleMenuIsOpenned}
                    onClick={handleToggleMenu}
                >
                    {toggleMenuIsOpenned ? <MdClose /> : <MdMenu />}
                </ToggleMenu>
                <LogoImg src={logoImg} alt="Logo Minha Carteira" />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink onClick={handleToggleMenu} to='/'>
                    <MdSpaceDashboard />
                    DashBoard
                </MenuItemLink>

                <MenuItemLink onClick={handleToggleMenu} to='/list/entry-balance'>
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink onClick={handleToggleMenu} to='/list/exit-balance'>
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={() => {signOut(); handleToggleMenu();}}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    )
}

export default Aside;