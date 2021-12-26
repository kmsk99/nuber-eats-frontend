import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { Dish } from '../../components/dish';
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
    myRestaurant,
    myRestaurantVariables,
} from '../../__generated__/myRestaurant';

export const MY_RESTAURANT_QUERY = gql`
    query myRestaurant($input: MyRestaurantInput!) {
        myRestaurant(input: $input) {
            ok
            error
            restaurant {
                ...RestaurantParts
                menu {
                    ...DishParts
                }
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${DISH_FRAGMENT}
`;

export const MyRestaurant = () => {
    const { id } = useParams<'id'>();
    const { data } = useQuery<myRestaurant, myRestaurantVariables>(
        MY_RESTAURANT_QUERY,
        {
            variables: {
                input: {
                    id: +id!,
                },
            },
        }
    );
    console.log(data);
    return (
        <div>
            <Helmet>
                <title>
                    {data?.myRestaurant.restaurant?.name || 'Loading...'} |
                    Nuber Eats
                </title>
            </Helmet>
            <div
                className="bg-gray-700 bg-center bg-cover py-28"
                style={{
                    backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
                }}
            ></div>
            <div className="container mt-10">
                <h2 className="mb-10 text-4xl font-medium">
                    {data?.myRestaurant.restaurant?.name || 'Loading...'}
                </h2>
                <Link
                    to={`/restaurants/${id}/add-dish`}
                    className="px-10 py-3 mr-8 text-white bg-gray-800 "
                >
                    Add Dish &rarr;
                </Link>
                <Link to={``} className="px-10 py-3 text-white bg-lime-700">
                    Buy Promotion &rarr;
                </Link>
                <div className="mt-10">
                    {data?.myRestaurant.restaurant?.menu.length === 0 ? (
                        <h4 className="mb-5 text-xl">Please upload a dish!</h4>
                    ) : (
                        <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                            {data?.myRestaurant.restaurant?.menu.map((dish) => (
                                <Dish
                                    name={dish.name}
                                    description={dish.description}
                                    price={dish.price}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};