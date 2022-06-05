import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; // Se não couber na linha, vá para a próxima.
    > h1, span, p, div {
        color: ${props => props.theme.colors.letter};
    }
`;