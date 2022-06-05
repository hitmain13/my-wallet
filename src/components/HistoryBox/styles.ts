import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;

    color: ${props => props.theme.colors.white};


    border-radius: 7px;


`;

export const ChartContainer = styled.div`
    flex: 1;
    height: 300px;
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
    `;
export const LegendContainer = styled.ul`
    display: flex;

    list-style: none;
`;
export const Legend = styled.li`

    display: flex;
    align-items: center;

    margin: 7px 27px;
    
    > div{
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
