import styled from 'styled-components'

export const Container = styled.div``;

export const Content = styled.div``;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    
    .tag-filter {
        font-size: 18px;
        font-weight: 500;
        font-style: italic;
        color: ${props => props.theme.colors.white};
        
        background: linear-gradient(90deg, ${props => props.theme.colors.quartiary});
        margin: 0 10px 30px 50px;

        transition: all .2s;
        
        padding: 10px;

        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px;
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 5px;

        :hover {
            color: #FFF;
            border-color: ${props => props.theme.colors.tertiary}
        }
    }

    .tag-filter-recurrent::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 7px solid ${props => props.theme.colors.warning};

            border-radius: 3px 0;
            margin: 0 auto;
        }

    .tag-filter-eventual::after {
            content: '';
            display: block;
            width: 55px;
            border-bottom: 7px solid ${props => props.theme.colors.success};

            border-radius: 3px 0;
            margin: 0 auto;
        }
`;