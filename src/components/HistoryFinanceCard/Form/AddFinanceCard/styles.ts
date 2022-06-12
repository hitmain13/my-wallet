import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px;

    @media (max-width: 767px) {
        margin: 25px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    width: 100%;
    max-height: 100vh;
    overflow: auto;

    justify-content: space-between;
`;

export const FormTitle = styled.h1`
    color: ${props => props.theme.colors.letter};
    margin-bottom: 40px;

    &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 7px solid ${props => props.theme.colors.green};

            border-radius: 3px 0;
    }
`;

export const Logo = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;
    justify-content: center;

    width: 300px;
    height: 100px;
    
    padding: 10px;
    border-radius: 300px 300px 0 0 ;

    background-color: ${props => props.theme.colors.tertiary};

    > h2 {
        color: ${props => props.theme.colors.white};
        margin-left: 7px;
    }

    > img {
        width: 50px;
        height: 50px;
    }
    `;

export const Label = styled.label`
    color: ${props => props.theme.colors.letter};
    font-size: 14px;
    margin: 10px 0 0 0;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const HeaderContent = styled.div``;
export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 1023px) {
        flex-wrap: wrap;
    }
`;
export const Select = styled.select`
    width: 100px;
`;

export const SelectLabel = styled.label`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.colors.letter};
    font-size: 14px;
    margin: 20px 0 0 0;

    > select, input {
        width: 100%;
        height: 30px;

        margin: 7px 0;
        padding: 3px;

        font-size: 12px;

        border-radius: 5px;
        color: #000;
        background-color: ${props => props.theme.colors.input};

        @media (max-width: 1023px) {
            width: 120px;
        }
    }
`;

export const FooterContent = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DescriptionInput = styled.input`
    width: 100%;

    margin: 7px 0;
    padding: 10px;

    border-radius: 5px;

    color: #000;
    background-color: ${props => props.theme.colors.input};
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;

    margin-top: 30px;
`;

export const Input = styled.input`
    width: 100%;

    margin: 7px 0;
    padding: 10px;

    border-radius: 5px;
    color: #000;
    background-color: ${props => props.theme.colors.input};
`;

export const Button = styled.button`
    width: 150px;

    padding: 10px;

    border-radius: 5px;

    font-size: 1em;

    font-weight: bold;
    color: ${props => props.theme.colors.letter};
    background-color: ${props => props.theme.colors.warning};

    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
}
    @media (max-width: 767px) {
        margin: 10px 0 0 0;
        width: 100px;
    }
`;

export const CloseButton = styled.button`
    position: relative;
    right: 0;
    top: 0;

    width: 40px;
    height: 40px;

    font-size: 2.4em;

    color: ${props => props.theme.colors.letter};
    background-color: ${props => props.theme.colors.primary};
`;