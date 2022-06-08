import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { useAuth } from '../hooks/auth'

import App from '../routes/app.routes'
import Auth from '../routes/auth.routes'

const Routes: React.FC = () => {
    const { logged } = useAuth();
    return (
        <BrowserRouter>
            {logged ? <App /> : <Auth />}
        </BrowserRouter>
    )
}
export default Routes;