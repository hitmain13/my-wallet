import React, { useState } from 'react';
import {
    Container,
    Header,
    LogoImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemButton,
    MenuButton,
    ToggleMenu
} from './styles'

import {
    MdSpaceDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp,
    MdClose,
    MdMenu
} from 'react-icons/md'

import { AiOutlinePlus } from 'react-icons/ai';
import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/useAuth'
import { useModal } from '../../hooks/useModals';

const Aside: React.FC = () => {
    const [toggleMenuIsOpenned, setToggleMenuIsOpenned] = useState(false);
    const { signOut } = useAuth()
    const { toggleModal } = useModal()

    const handleToggleMenu = () => setToggleMenuIsOpenned(!toggleMenuIsOpenned)

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

                <MenuButton onClick={() => {
                    handleToggleMenu();
                    toggleModal();
                }}>
                    <AiOutlinePlus />
                    Novo registro
                </MenuButton>

                <MenuItemLink onClick={handleToggleMenu} to='/list/entry-balance'>
                    <MdArrowUpward />
                    Entradas
                </MenuItemLink>

                <MenuItemLink onClick={handleToggleMenu} to='/list/exit-balance'>
                    <MdArrowDownward />
                    Saídas
                </MenuItemLink>

                <MenuItemButton onClick={() => { signOut(); handleToggleMenu(); }}>
                    <MdExitToApp />
                    Sair
                </MenuItemButton>
            </MenuContainer>
        </Container>
    )
}

export default Aside;