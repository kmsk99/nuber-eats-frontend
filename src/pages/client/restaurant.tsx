import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { RESTAURANT_FRAGMENT } from '../../fragments';
import {
    restaurant,
    restaurantVariables,
} from '../../__generated__/restaurant';

const RESTAURANT_QUERY = gql`
    query restaurant($input: RestaurantInput!) {
        restaurant(input: $input) {
            ok
            error
            restaurant {
                ...RestaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`;

export const Restaurant = () => {
    const params = useParams<'id'>();
    const { loading, data } = useQuery<restaurant, restaurantVariables>(
        RESTAURANT_QUERY,
        {
            variables: {
                input: {
                    restaurantId: +params.id!,
                },
            },
        }
    );
    return (
        <div>
            <Helmet>
                <title>
                    {data?.restaurant.restaurant?.name || ''} | Nuber Eats
                </title>
            </Helmet>
            <div
                className="py-48 bg-gray-800 bg-center bg-cover "
                style={{
                    backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
                }}
            >
                <div className="w-3/12 py-8 pl-48 bg-white">
                    <h4 className="mb-3 text-4xl">
                        {data?.restaurant.restaurant?.name}
                    </h4>
                    <h5 className="mb-2 text-sm font-light">
                        {data?.restaurant.restaurant?.category?.name}
                    </h5>
                    <h6 className="text-sm font-light">
                        {data?.restaurant.restaurant?.address}
                    </h6>
                </div>
            </div>
        </div>
    );
};
