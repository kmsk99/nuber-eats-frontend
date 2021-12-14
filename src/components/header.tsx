import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import nuberLogo from '../images/logo.svg';

export const Header: React.FC = () => {
    const { data } = useMe();
    return (
        <header className="py-4">
            <div className="flex items-center justify-between w-full max-w-screen-xl px-5 mx-auto xl:px-0">
                <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
                <span className="text-xs">
                    <Link to="/my-profile">
                        <FontAwesomeIcon icon={faUser} className="text-xl" />
                    </Link>
                </span>
            </div>
        </header>
    );
};
