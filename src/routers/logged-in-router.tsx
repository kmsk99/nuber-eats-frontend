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
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';

const ClientRoutes = [
    <Route key={1} path="/" element={<Restaurants />} />,
    <Route key={2} path="/confirm" element={<ConfirmEmail />} />,
    <Route key={3} path="/edit-profile" element={<EditProfile />} />,
];

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
                {data.me.role === 'Client' && ClientRoutes}
                <Route path="/*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    );
};
