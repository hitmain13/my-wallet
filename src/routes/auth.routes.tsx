import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'

const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="/*" element={<Navigate to='/' />} />
        <Route path="/" element={<Login />} />
    </Routes>
)

export default AuthRoutes;