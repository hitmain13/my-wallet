import React from 'react';

import { 
    Container,
    ToggleLabel
    } from './styles'

const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Light</ToggleLabel>
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
)