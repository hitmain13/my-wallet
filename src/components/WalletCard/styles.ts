import styled from 'styled-components';

interface IContentProps {
    color: string;
}

export const Container = styled.div<IContentProps>`
    width: 32%;
    height: 150px;

    margin: 10px 0;

    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
    padding: 10px 20px;

    position: relative;
    overflow: hidden;

    > img {
        height: 125%;

        transform: rotate(-15deg);

        position: absolute;
        top: -10px;
        right: -25px;

        opacity: .3;
    }

    > span {
        font-size: 18px;
        font-weight: 500;
    }

    > small {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }
`;