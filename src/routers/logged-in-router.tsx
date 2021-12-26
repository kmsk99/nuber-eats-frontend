import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import { Category } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { Restaurants } from '../pages/client/restaurants';
import { Search } from '../pages/client/search';
import { ConfirmEmail } from '../pages/user/confirm-email';
import { EditProfile } from '../pages/user/edit-profile';
import { MyRestaurants } from '../pages/owner/my-restaurants';
import { MyRestaurant } from '../pages/owner/my-restaurant';
import { AddRestaurant } from '../pages/owner/add-restaurants';
import { AddDish } from '../pages/owner/add-dish';

const clientRoutes = [
    {
        path: '/',
        component: <Restaurants />,
    },
    {
        path: '/search',
        component: <Search />,
    },
    {
        path: '/category/:slug',
        component: <Category />,
    },
    {
        path: '/restaurants/:id',
        component: <Restaurant />,
    },
];

const commonRoutes = [
    { path: '/confirm', component: <ConfirmEmail /> },
    { path: '/edit-profile', component: <EditProfile /> },
];

const restaurantRoutes = [
    { path: '/', component: <MyRestaurants /> },
    { path: '/add-restaurant', component: <AddRestaurant /> },
    { path: '/restaurants/:id', component: <MyRestaurant /> },
    { path: '/restaurants/:restaurantId/add-dish', component: <AddDish /> },
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
                {data.me.role === 'Client' &&
                    clientRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                        />
                    ))}
                {data.me.role === 'Owner' &&
                    restaurantRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.component}
                        />
                    ))}
                {commonRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                    />
                ))}
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};
