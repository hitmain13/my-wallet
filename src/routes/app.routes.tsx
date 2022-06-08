import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';

const App: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/list/:balanceType" element={<List />} />
            <Route path="/*" element={<Navigate to='/' />} />
            <Route path="/" element={<Dashboard />} />
        </Routes>
    </Layout>
)

export default App;