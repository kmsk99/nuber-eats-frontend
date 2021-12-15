import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import nuberLogo from '../images/logo.svg';

export const Header: React.FC = () => {
    const { data } = useMe();
    return (
        <>
            {!data?.me.verified && (
                <div className="p-3 text-base text-center text-white bg-red-500">
                    <span>Please verify your email.</span>
                </div>
            )}
            <header className="py-4">
                <div className="flex items-center justify-between w-full px-5 mx-auto xl:px-0 max-w-screen-2xl">
                    <Link to="/">
                        <img
                            src={nuberLogo}
                            className="w-36"
                            alt="Nuber Eats"
                        />
                    </Link>
                    <span className="text-xs">
                        <Link to="/edit-profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-xl"
                            />
                        </Link>
                    </span>
                </div>
            </header>
        </>
    );
};
