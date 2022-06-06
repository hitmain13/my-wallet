import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'

const AuthRoutes: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    </BrowserRouter>
)

export default AuthRoutes;