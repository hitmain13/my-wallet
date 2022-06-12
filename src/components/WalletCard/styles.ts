import styled, { keyframes } from 'styled-components';

interface IContentProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateY(-300px);
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

export const Container = styled.div<IContentProps>`
    width: 32%;
    height: 150px;

    margin: 10px 0;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    padding: 10px 20px;

    position: relative;
    overflow: hidden;
    
    transition: all 0.2;
    font-size: 1.4em;

    animation: ${animate} 0.5s;

    > h1 {
        transition: font-size 0.2s;
    }

    &:hover {
        transform: scale(1.01);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
        h1 {
            font-size: 1em;
        }
        small {
            transform: translateY(0px);
        }
        > img {
            transform: rotate(0deg);
        }
    }

    > img {
        height: 125%;

        transform: rotate(-20deg);
        transition: all .2s;

        position: absolute;
        top: -10px;
        right: -25px;

        opacity: .3;
    }

    > span {
        font-size: 20px;
        font-weight: 500;
    }

    > small {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
        transform: translateY(100px);
        transition: all .2s;
    }

    @media (max-width: 770px) {
        > span {
            font-size: 14px;
        }
        > h1 {
            word-wrap: break-word;
            font-size: 22px;
            > strong {
                display: inline-block;
                width: 100%;
                font-size: 16px;
            }
        }
    }

    @media (max-width: 420px) {
        width: 100%;

        > h1 {
            display: flex;

            > strong {
                position: initial;
                width: auto;
                font-size: 22px;
            }
            
            > strong::after {
                display: inline-block;
                content: " ";
            }
        }
    }
`;