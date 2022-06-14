import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    
    background-color: #0005;

    visibility: visible;
    z-index: 2;
`;

export const ModalContainer = styled.div`
    width: 50%;
    max-height: 100vh;
    overflow: auto;
    
    background-color: ${props => props.theme.colors.primary};

    border-radius: 5px;

    z-index: 3;

    @media (max-width: 1023px) {
        width: 90%;
    }

    @media (min-width: 767px) {
        height: 470px;
    }

    @media (max-width: 374px) {
        width: 100%;
    }
`;

export const Header = styled.div`
    background-color: red;
`;