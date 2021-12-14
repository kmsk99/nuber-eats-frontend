import React from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { Restaurants } from '../pages/client/restaurants';

const ClientRoutes = [<Route path="/" element={<Restaurants />}></Route>];

export const LoggedInRouter = () => {
    const { data, loading, error } = useMe();
    if (!data || loading || error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-xl font-medium tracking-wide">
                    Loading...
                </span>
            </div>
        );
    }

    return (
        <Router>
            <Header />
            <Routes>
                {data.me.role === 'Client' ? ClientRoutes : <Navigate to="/" />}
            </Routes>
        </Router>
    );
};
