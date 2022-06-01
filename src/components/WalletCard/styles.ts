import styled from 'styled-components';

interface IContentProps {
    color: string;
}

export const Container = styled.div<IContentProps>`
    background-color: ${props => props.color}
`;