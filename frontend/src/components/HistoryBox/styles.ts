import styled, { keyframes } from 'styled-components'

const animate = keyframes`
    0% {
        transform: translateY(100vh);
        opacity: 0.1;
    }
    30% {
        opacity: 0.3;
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;

    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    animation: ${animate} 0.5s;
`;

export const ChartContainer = styled.div`
    width: 100%;
    height: 300px;
    @media (max-width: 1279px) {
        margin: 7px -30px;
    }
`;


export const Header = styled.header`
    width: 100%;

    display: flex;
    justify-content: space-between;

    margin: 10px 0;
    padding: 30 20px;

    > h2 {
        margin: 15px 0;
        padding-left: 27px;
    }

    @media (max-width: 1279px) {
        flex-direction: column;
        margin: 7px -10px;
    }
`;

export const LegendContainer = styled.ul`
    display: flex;
    justify-content: space-between;

    list-style: none;
`;

export const Legend = styled.li`

    display: flex;
    align-items: center;

    margin: 7px 27px;
    
    > div{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        background-color: ${props => props.color};

        width: 40px;
        height: 40px;
        border-radius: 5px;

        font-size: 14px;
        line-height: 40px;

        text-align: center;
    }

    > span {
        margin-left: 5px;
    }
`;