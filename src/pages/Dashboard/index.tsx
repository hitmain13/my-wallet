import ContentHeader from '../../components/ContentHeader'

import SelectInput from '../../components/SelectInput'

import { Container } from './styles'


const Dashboard = () => {

    const options = [
        { value: 'Fábio', label: 'LabelFabio' },
        { value: '2', label: 'Label2' },
        { value: '3', label: 'Label3' }
    ]

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor='#F7931B'>
                <SelectInput options={options} onChange={() => {}}/>
            </ContentHeader>
        </Container>
    )
}

export default Dashboard;