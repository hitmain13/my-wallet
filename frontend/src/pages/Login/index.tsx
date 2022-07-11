import React, { useState, useMemo } from 'react';

import logoSVG from '../../assets/logo.svg';
import Input from '../../components/Input'
import Button from '../../components/Button'
import P from '../../components/Message'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { Container, Logo, Form, FormTitle, Label, FooterContainer, Link } from './styles'

import { useAuth } from '../../hooks/useAuth'
import axios from 'axios';

const initialState = {
    email: 'fabio@dashboard.com',
    password: '123',
}
interface IRepo {
    name: string,
    pushed_at: string,
    date: React.SetStateAction<null>
}

const Login: React.FC = () => {
    const [user, setUser] = useState(initialState);
    const [repoDate, setRepoDate] = useState(null);
    const { signIn } = useAuth();

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setUser({
            ...user,
            [name]: value
        });
    }

    useMemo(() => {
        axios.get('https://api.github.com' + process.env.REACT_APP_GITHUB_MY_REPOS, {
            'headers': {
                'Authorization': `token ${process.env.REACT_APP_GITHUB_MY_TOKEN}`
            }
        })
            .then((res) => {
                const data = res.data;
                data.map((repo: IRepo) => ({
                    name: repo.name,
                    date: repo.pushed_at,
                }))
                    .filter((repo: IRepo) => repo.name === process.env.REACT_APP_APP_NAME)
                    .map((repo: IRepo) => setRepoDate(repo.date))
            })
    }, [])

    return (
        <Container>
            <Logo>
                <img src={logoSVG} alt="My Wallet" />
                <h2>My Wallet</h2>
            </Logo>
            <Form onSubmit={(event) => signIn(user.email, user.password, event)}>
                <FormTitle>Entrar</FormTitle>

                <Label>E-mail</Label>
                <Input
                    type='email'
                    placeholder='Digite seu e-mail'
                    name='email'
                    onChange={onChange}
                    value={user.email}
                />
                <Label>Senha</Label>
                <Input
                    type='password'
                    placeholder='Digite sua senha'
                    name='password'
                    onChange={onChange}
                    value={user.password}
                />
                <Button type='submit'>Acessar</Button>
            </Form>
            <Label>Para testar, clique em Acessar!</Label>
            <br />
            <FooterContainer>
                <Link target="_blank" href="https://www.linkedin.com/in/fabio-matsumoto-7a8682173/">
                    <AiFillLinkedin />LinkedIn
                </Link>
                <Link target="_blank" href="https://github.com/hitmain13/my-wallet-react.js">
                    <AiFillGithub />Link do repositório
                </Link>
                <Label>Projeto ainda em desenvolvimento. Última atualização: <P message={repoDate} />. (GitHub API)</Label>
            </FooterContainer>
        </Container>
    )
}

export default Login;