import styled, { css } from 'styled-components'

interface ITagProps {
    color: string;
}
interface ITagContainerProps {
    isExpanded: boolean;
    color: string;
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

    margin-right: -65px;
    transform: translateX(-85px);

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
    
    @media (max-width: 414px) {
        > h3 {
            font-size: 1em;
        }
        > div {
            > span {
                font-size: 14px;
            }
            > small {
                font-size: 10px;
            }
        }
    }
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
    
    border-radius: 5px;

    font-weight: bold;
    color: ${props => props.theme.colors.letter};
    background-color: ${props => props.color};

    z-index: 0;
    transition: opacity 0.2s;
    transition: visibility 0.1s;
    visibility: hidden;

    > svg {
        width: 30px;
        height: 30px;
    }

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

    border-radius: 5px;

    font-weight: bold;
    color: ${props => props.theme.colors.letter};
    background-color: ${props => props.color};

    z-index: 0;
    transition: opacity 0.2s;
    transition: visibility 0.1s;
    visibility: hidden;

    > svg {
        width: 30px;
        height: 30px;
    }

    &:hover {
        opacity: 0.7;
    }
    ${props => props.isExpanded && css`
        visibility: visible;
    `};
`;