import styled, { css } from 'styled-components'

interface ITagProps {
    color: string;
}
interface ITagContainerProps {
    isExpanded: boolean;
}

export const Container = styled.div`
    display: flex;
`;

export const TagContainer = styled.div<ITagContainerProps>`
    background: linear-gradient(90deg, ${props => props.theme.colors.quartiary});

    list-style: none;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: ${props => props.theme.colors.gray};
    color: ${props => props.theme.colors.letter};

    margin: 5px 0;
    padding: 12px 10px;
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    transition: all 0.2s;

    position: relative;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    margin-right: -105px;
    transform: translateX(-115px);

    &:hover {
        margin-left: 5px;
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

    ${props => props.isExpanded && css`
        transform: translateX(0px);
        margin-right: -10px;
    `};

`;

export const Tag = styled.button<ITagProps>`
    width: 12px;
    height: 60%;

    position: absolute;
    left: 0;

    background-color: ${props => props.color};
    border-radius: 0 4px 4px 0;

`;

export const EditButton = styled.button<ITagContainerProps>`
    position: relative;

    margin: 30px 5px;
    padding: 5px;
    
    border-radius: 5px;

    font-weight: bold;
    color: ${props => props.theme.colors.letter};
    background-color: ${props => props.theme.colors.warning};

    z-index: 0;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }
    ${props => props.isExpanded && css`
        visibility: visible;
    `};
`;

export const DeleteButton = styled.button<ITagContainerProps>`
    position: relative;

    margin: 30px 5px;
    padding: 5px;

    border-radius: 5px;

    font-weight: bold;
    color: ${props => props.theme.colors.letter};
    background-color: ${props => props.theme.colors.warning};

    z-index: 0;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }
    ${props => props.isExpanded && css`
        visibility: visible;
    `};
`;