import React from 'react';

import { Container } from './styles'

import MainHeader from '../MainHeader'
import Aside from '../Aside'
import Content from '../Content'

const Layout: any = ({children}: any) => {
    return (
        <Container>
            <MainHeader />
            <Aside />
            <Content>
                {children}
            </Content>
        </Container>
    )
}

export default Layout;