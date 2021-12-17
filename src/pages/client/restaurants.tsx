import { gql, useQuery } from '@apollo/client';
import { url } from 'inspector';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Restaurant } from '../../components/restaurant';
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments';
import {
    restaurantsPageQuery,
    restaurantsPageQueryVariables,
} from '../../__generated__/restaurantsPageQuery';

const RESTAURANTS_QUERY = gql`
    query restaurantsPageQuery($input: RestaurantsInput!) {
        allCategories {
            ok
            error
            categories {
                ...CategoryParts
            }
        }
        restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            results {
                ...RestaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
    searchTerm: string;
}

export const Restaurants = () => {
    const [page, setPage] = useState(1);
    const { data, loading } = useQuery<
        restaurantsPageQuery,
        restaurantsPageQueryVariables
    >(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page,
            },
        },
    });
    const onNextPageClick = () => setPage((current) => current + 1);
    const onPrevPageClick = () => setPage((current) => current - 1);
    const { register, handleSubmit, getValues } = useForm<IFormProps>();
    const history = useNavigate();
    const onSearchSubmit = () => {
        const { searchTerm } = getValues();
        history({
            pathname: '/search',
            search: `?term=${searchTerm}`,
        });
    };
    return (
        <div>
            <Helmet>
                <title>Home | Nuber Eats</title>
            </Helmet>
            <form
                onSubmit={handleSubmit(onSearchSubmit)}
                className="flex items-center justify-center w-full py-40 bg-gray-800"
            >
                <input
                    {...register('searchTerm', { required: true, min: 3 })}
                    name="searchTerm"
                    type="Search"
                    className="w-3/4 border-0 rounded-md input md:w-3/12"
                    placeholder="Search restaurants..."
                />
            </form>
            {!loading && (
                <div className="pb-20 mx-auto mt-8 max-w-screen-2xl">
                    <div className="flex justify-around max-w-sm mx-auto ">
                        {data?.allCategories.categories?.map((category) => (
                            <Link
                                key={category.id}
                                to={`/category/${category.slug}`}
                            >
                                <div className="flex flex-col items-center cursor-pointer group">
                                    <div
                                        className="w-16 h-16 bg-cover rounded-full group-hover:bg-gray-100"
                                        style={{
                                            backgroundImage: `url(${category.coverImg})`,
                                        }}
                                    ></div>
                                    <span className="mt-1 text-sm font-medium text-center">
                                        {category.name}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
                        {data?.restaurants.results?.map((restaurant) => (
                            <Restaurant
                                key={restaurant.id}
                                id={restaurant.id + ''}
                                coverImg={restaurant.coverImg}
                                name={restaurant.name}
                                categoryName={restaurant.category?.name}
                            />
                        ))}
                    </div>
                    <div className="grid items-center max-w-md grid-cols-3 mx-auto mt-10 text-center">
                        {page > 1 ? (
                            <button
                                onClick={onPrevPageClick}
                                className="text-2xl font-medium focus:outline-none"
                            >
                                &larr;
                            </button>
                        ) : (
                            <div></div>
                        )}
                        <span>
                            Page {page} of {data?.restaurants.totalPages}
                        </span>
                        {page !== data?.restaurants.totalPages ? (
                            <button
                                onClick={onNextPageClick}
                                className="text-2xl font-medium focus:outline-none"
                            >
                                &rarr;
                            </button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
