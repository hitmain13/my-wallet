import React, { useState } from 'react';
import DarkModeToggle from "react-dark-mode-toggle";

import { Container } from './styles'

export const Toggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => false);

    return (
        <Container>
            <DarkModeToggle
                onChange={setIsDarkMode}
                checked={isDarkMode}
                size={75}
            />
        </Container>
    )
}
