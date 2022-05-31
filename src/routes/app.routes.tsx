import React from 'react';
import { Routes, Route } from "react-router-dom";

import Layout from '../components/Layout'
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';

const App: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/list/:balanceType" element={<List />} />
        </Routes>
    </Layout>
)

export default App;