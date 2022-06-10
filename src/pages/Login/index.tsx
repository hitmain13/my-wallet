import React, { useState, useMemo } from 'react';

import logoSVG from '../../assets/logo.svg';

import Input from '../../components/Input'
import Button from '../../components/Button'
import P from '../../components/Message'

import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

import { useAuth } from '../../hooks/useAuth'

import { Container, Logo, Form, FormTitle, Label, FooterContainer, Link } from './styles'
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('email@email.com');
    const [password, setPassword] = useState<string>('123');
    const [repoDate, setRepoDate] = useState(null);

    const { signIn } = useAuth();

    useMemo(() => {
        axios.get('https://api.github.com' + process.env.REACT_APP_GITHUB_MY_REPOS, {
            'headers': {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_MY_TOKEN}`
            }
        })
            .then((res) => {
                const data = res.data;
                data.map((repo: any) => ({
                    name: repo.name,
                    date: repo.pushed_at,
                }))
                    .filter((repo: any) => repo.name === process.env.REACT_APP_APP_NAME)
                    .map((repo: any) => setRepoDate(repo.date))
            })
    }, [])

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
            <Label>Para testar, clique em Acessar!</Label>
            <br />
            <Link target="_blank" href="https://github.com/hitmain13/my-wallet-react.js">
                <AiFillGithub />Link do repositório
            </Link>
            <Link target="_blank" href="https://www.linkedin.com/in/fabio-matsumoto-7a8682173/">
                <AiFillLinkedin/>LinkedIn
            </Link>
            <FooterContainer>
                <Label>Projeto ainda em desenvolvimento. Última atualização: <P message={repoDate} />. (GitHub API)</Label>
            </FooterContainer>
        </Container>
    )
}

export default Login;