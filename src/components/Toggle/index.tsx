import React, { useState } from 'react';
import DarkModeToggle from "react-dark-mode-toggle";

import { Container } from './styles'

interface IToggleProps {
    checked: boolean,
    onChange(): void,
}

export const Toggle: React.FC<IToggleProps> = ({ checked, onChange }) => {
    return (
        <Container>
            <DarkModeToggle
                onChange={onChange}
                checked={checked}
                size={75}
                speed={2.5}
            />
        </Container>
    )
}
