import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuth } from '../hooks/auth'

import App from '../routes/app.routes'
import Auth from '../routes/auth.routes'

const Routers: React.FC = () => {
    const { logged } = useAuth();
    console.log(logged)
    return logged ? <App /> : <Auth />
}

export default Routers;