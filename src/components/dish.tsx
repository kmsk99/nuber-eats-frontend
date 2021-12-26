import React from 'react';

interface IDishProps {
    description: string;
    name: string;
    price: number;
}

export const Dish: React.FC<IDishProps> = ({ description, name, price }) => {
    return (
        <div className="px-8 py-4 transition-all border cursor-pointer  hover:border-gray-800">
            <div className="mb-5">
                <h3 className="text-lg font-medium ">{name}</h3>
                <h4 className="font-medium">{description}</h4>
            </div>
            <span>${price}</span>
        </div>
    );
};
