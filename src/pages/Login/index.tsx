import React, { useState } from 'react';

import logoSVG from '../../assets/logo.svg';

import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/auth'

import { Container, Logo, Form, FormTitle, Label } from './styles'

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('2@2.com');
    const [password, setPassword] = useState<string>('123');

    const { signIn } = useAuth();

    return (
        <Container>
            <Logo>
                <img src={logoSVG} alt="My Wallet" />
                <h2>My Wallet</h2>
            </Logo>
            <Form onSubmit={(event) => signIn(email, password, event)}>
                <FormTitle>Entrar</FormTitle>

                <Label>E-mail</Label>
                <Input
                    type='email'
                    placeholder='Digite seu e-mail'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Label>Senha</Label>
                <Input
                    type='password'
                    placeholder='Digite sua senha'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit'>Acessar</Button>
            </Form>
        </Container>
    )
}

export default Login;