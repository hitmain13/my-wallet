import React, { useState } from 'react';

import logoSVG from '../../assets/logo.svg';

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/auth'

import { Container, Logo, Form, FormTitle } from './styles'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signIn } = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoSVG} alt="My Wallet" />
                <h2>My Wallet</h2>
            </Logo>
            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>Entrar</FormTitle>

                <Input
                    placeholder='Email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type='password'
                    placeholder='Senha'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit'>Acessar</Button>
            </Form>
        </Container>
    )
}

export default Login;