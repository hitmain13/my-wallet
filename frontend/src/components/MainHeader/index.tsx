import React, { useMemo, useState } from 'react';

import emojis from '../../utils/emojis'

import { Toggle } from '../Toggle'

import { useTheme } from '../../hooks/useTheme'

import { Container, Profile, Welcome, UserName } from './styles'

const MainHeader: React.FC = () => {
    const { toggleTheme, theme } = useTheme();

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    const emoji = useMemo(() => {
        const indice = Math.floor(Math.random() * (emojis.length - 1))
        return emojis[indice];
    }, [])

    return (
        <Container>
            <Toggle 
                checked={darkTheme}
                onChange={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá, {emoji} </Welcome>
                <UserName>Fábio Matsumoto!</UserName>
            </Profile>
        </Container>
    )
}

export default MainHeader;