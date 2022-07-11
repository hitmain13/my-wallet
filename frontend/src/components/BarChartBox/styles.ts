import styled from 'styled-components';

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    display: flex;
    
    width: 48%;
    min-height: 260px;

    margin: 10px 0;
    
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    
    @media (max-width: 1200px) {
        flex-direction: column;

        width: 100%;
        height: auto;
    }
`;

export const LeftSide = styled.aside`
    width: 44%;
    padding: 30px 20px;
    
    > h2 {
        padding-left: 16px;
        margin-bottom: 10px;
    }
    @media (max-width: 1200px) {
        width: 100%;
        padding: 20px 15px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;

    height: 175px;
    padding: 5px 16px 0 10px;
    overflow-x: hidden;
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

    @media (max-width: 1200px) {
        display: flex;
        justify-content: space-between;
        height: auto;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    
    > div{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        background-color: ${props => props.color};

        min-width: 40px;
        min-height: 40px;
        border-radius: 5px;

        font-size: 12px;
        line-height: 40px;

        text-align: center;
    }

    > span {
        margin-left: 5px;
    }
`;

export const RightSide = styled.main`
    display: flex;
    justify-content: center;
    flex: 1;

    padding: 30px 20px;
    @media (max-width: 1200px) {
        padding: 20px 10px;
        height: auto;
    }
`;