import styled from 'styled-components'

export const Container = styled.div`
    width: 48%;
    height: 260px;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    margin: 10px 0px;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > header img {
        width: 35px;
        margin-left: 0.3em;
    }

    > header p {
        font-size: 18px;
    }
    @media (max-width: 1279px) {
        width: 100%;
    }
    @media (max-width: 770px) {
        width: 100%;
        height: auto;
        > header h1 {
            font-size: 24px;

            img {
                height: 20px;
                width: 20px;
            }
        }
        > header p, > footer span {
            font-size: 14px;
        }
    }

    @media (max-width: 420px) {

        > header p {
            margin-bottom: 15px;
        }
    }
`