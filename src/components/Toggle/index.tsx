import React, { useState } from 'react';

import { 
    Container,
    ToggleLabel,
    ToggleSelector
    } from './styles'

export const Toggle: React.FC = () => {
    const [theme, setTheme] = useState(false);

    return (
    <Container>
        <ToggleLabel>Claro</ToggleLabel>
        <ToggleSelector 
            checked={theme}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => setTheme(!theme)}
        />
        <ToggleLabel>Escuro</ToggleLabel>
    </Container>
    )
}
