import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export const NotFound = () => (
    <div className="flex flex-col items-center justify-center h-screen">
        <Helmet>
            <title>Not Found | Nuber Eats</title>
        </Helmet>
        <h2 className="mb-3 text-2xl font-semibold">Page Not Found.</h2>
        <h4 className="mb-5 text-base font-medium">
            The page you're looking for does not exist or has moved.
        </h4>
        <Link className="hover:underline text-lime-600" to="/">
            Go back home &rarr;
        </Link>
    </div>
);
