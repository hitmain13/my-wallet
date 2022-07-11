import { Container } from './styles'

import MainHeader from '../components/MainHeader'
import Aside from '../components/Aside'
import Content from '../components/Content'

type TLayout = {
    children?: React.ReactNode
}

const Layout: React.FC<TLayout> = ({ children }) => (
    <Container>
        <MainHeader />
        <Aside />
        <Content>
            {children}
        </Content>
    </Container>
)

export default Layout;  