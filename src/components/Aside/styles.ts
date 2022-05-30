import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    grid-area: AS;
    background-color: ${props => props.theme.colors.secondary};

    padding-left: 20px;

    border-right: 1px solid ${props => props.theme.colors.gray};
`;

export const Header = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
`;

export const LogoImg = styled.img`
    height: 40px;
    width: 40px;
    cursor: pointer;
`;

export const Title = styled.h3`
    font-size: 1.8em;
    font-style: italic;
    font-weight: 500;
    color: ${props => props.theme.colors.white};
    margin-left: 10px;
    cursor: pointer;
`;

export const MenuContainer = styled.nav`
    display:flex;
    flex-direction: column;

    margin-top: 50px;
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
