import styled from "styled-components";

interface ITitleContainerProps {
    lineColor: string;
}

export const Container = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;
`;

export const TitleContainer = styled.div<ITitleContainerProps>`
     > h1 {
        color: ${props => props.theme.colors.white};

        &::after {
            content: '';
            display: block;
            width: 70px;
            border-bottom: 7px solid ${props => props.lineColor};

            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            border-radius: 3px 0;
            margin-left: 2px;
            margin-top: -2px;
        }
    }
`;

export const Controllers = styled.div`
    display: flex;
`;
