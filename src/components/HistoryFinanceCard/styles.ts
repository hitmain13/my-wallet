import styled from 'styled-components'


interface ITagProps {
    color: string;
}

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};

    list-style: none;
    border-radius: 5px;

    margin: 10px 0;
    padding: 12px 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    cursor: pointer;
    transition: all 0.2s;

    position: relative;

    &:hover {
        opacity: 0.7;
        transform: translateX(5px);
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        padding-left: 10px;

        > span {
            font-size: 1.2em;
            font-weight: 500;
        } 
    }
`;

export const Tag = styled.div<ITagProps>`
    width: 12px;
    height: 60%;

    position: absolute;
    left: 0;

    background-color: ${props => props.color};
    border-radius: 0 4px 4px 0;
`;
