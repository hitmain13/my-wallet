import styled, { keyframes } from 'styled-components';

interface ILegendProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(50vh);
        opacity: 0.1;
    }
    30% {
        opacity: 0.3;
    }
    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
    width: 48%;
    height: 260px;

    margin: 10px 0;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    display: flex;

    animation: ${animate} 0.5s;

    @media(max-width: 1279px) {
        padding: 10px;
        width: 100%;
        height: 240px;
    }

    @media(max-width: 767px) {
        display: flex;
        padding: 0px;
        height: 220px;
    }
`;

export const LeftSide = styled.aside`
    padding: 30px 20px;
    width: 200px;

    > h2 {
        margin-bottom: 20px;
    }
    @media(max-width: 1345px) {
        padding: 0 15px 5px;
        margin-bottom: 7px;

        >h2 { 
            margin-top: 15px;
            margin-bottom: 7px;
        }
    }
    @media(max-width: 420px) {
        padding: 25px;
        margin-bottom: 7px;
        width: 170px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;

    padding: 5px;
    padding-right: 20px;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.primary};

        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
    }

    @media(max-width: 1345px) {
        display: flex;
        flex-direction: column;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    
    > div {
        background-color: ${props => props.color};

        min-width: 40px;
        min-height: 40px;
        font-size: 12px;

        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 5px;

        line-height: 40px;

        text-align: center;
    }

    > span {
        margin-left: 5px;
    }
    @media(max-width: 1345px) {
        font-size: 14px;
        margin: 3px 0;

        > div {
            width: 35px;
            height: 35px;
            line-height: 35px;
        }

        >span {
            margin-left: 7px;
        }
    }
`;

export const RightSide = styled.main`
    display: flex;
    flex: 1;

    @media(max-width: 1345px) {
        height: 100%;
    }
    @media(max-width: 420px) {
        height: 220px;
    }
`;