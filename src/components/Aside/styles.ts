import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

interface IContainerProps {
    menuIsOpen?: boolean;
}

export const Container = styled.div<IContainerProps>`
    grid-area: AS;
    background-color: ${props => props.theme.colors.secondary};

    padding-left: 20px;

    border-right: 1px solid ${props => props.theme.colors.gray};

    position: relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        
    @media (max-width: 767px) {
        padding-left: 3px;
        position: fixed;

        z-index: 2;

        transition: transform 0.3s;

        ${props => props.menuIsOpen && css`
            height: 100vh;
            padding-right: 15px;
            transform: translatex(0px);
        `}

        ${props => !props.menuIsOpen && css`
            transform: translatex(-150px);
            height: 100vh;
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray};
        `};
    }
`;

export const Header = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
        margin-right: 5px;
    }
`;

export const LogoImg = styled.img`
    height: 40px;
    width: 40px;
    cursor: pointer;
    @media (max-width: 767px) {
        display: none;
        visibility: hidden;
    }
`;

export const Title = styled.h3<IContainerProps>`
    font-size: 1.8em;
    font-style: italic;
    font-weight: 500;
    color: ${props => props.theme.colors.white};
    margin-left: 10px;
    cursor: pointer;
    @media (max-width: 767px) {
        margin: -5px 0 0 0px;

        font-size: 1.4em;
        background-color: ${props => props.theme.colors.secondary};

        ${props => props.menuIsOpen && css`
            transform: translatex(-150px);
        `};
        ${props => !props.menuIsOpen && css`
        `};
    }
`;

export const MenuContainer = styled.nav`
    display:flex;
    flex-direction: column;

    margin: 50px 0 0 10px;
`;

export const MenuItemLink = styled(Link)`
    color: ${props => props.theme.colors.white};
    text-decoration: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .2s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const MenuItemButton = styled.button`
    font-size: 16px;
    color: ${props => props.theme.colors.white};

    border: none;
    background: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const ToggleMenu = styled.button<IContainerProps>`
    width: 40px;
    height: 40px;

    border-radius: 5px;
    font-size: 22px;

    background-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.letter};

    opacity: .7;
    transition: opacity .2s;

    &:hover {
        opacity: 1;
    }

    @media (max-width: 767px) {
        ${props => props.menuIsOpen && css`
            transform: translatex(0px);
        `};
        ${props => !props.menuIsOpen && css`
            transition: transform 0.5s;
            transform: translatex(150px);
        `};
    }

    @media (min-width: 768px) {
        display: none;
        visibility: hidden;
    }
`;

export const MenuButton = styled.button`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    background-color: ${props => props.theme.colors.secondary};

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .2s;

    font-size: 16px;

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
    &:hover {
        opacity: .7;
    }
`;