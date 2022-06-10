import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.colors.primary};
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

export const Form = styled.form`
    width: 300px;
    height: 350px;

    padding: 30px;

    border-radius: 0 0 10px 10px;

    background-color: ${props => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h1`
    color: ${props => props.theme.colors.white};
    margin-bottom: 40px;
    font-size: 2em;

    &::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 7px solid ${props => props.theme.colors.warning};

            border-radius: 3px 0;
    }
`;

export const Label = styled.label`
    color: ${props => props.theme.colors.letter};
    font-size: 14px;
    margin: 10px 0 0 0;
`;

export const FooterContainer = styled.div`
    position: absolute;
    bottom: 1%;
`;

export const Link = styled.a`
    display: flex;
    justify-content: center;
    color: ${props => props.theme.colors.letter};
    font-size: 14px;
    margin: 5px;

    > svg {
        width: 25px;
        height: 20px;
    }
    `;