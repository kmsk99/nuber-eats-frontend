import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import {
    createDish,
    createDishVariables,
} from '../../__generated__/createDish';
import { MY_RESTAURANT_QUERY } from './my-restaurant';

const CREATE_DISH_MUTATION = gql`
    mutation createDish($input: CreateDishInput!) {
        createDish(input: $input) {
            ok
            error
        }
    }
`;

interface IForm {
    name: string;
    price: string;
    description: string;
    [key: string]: string;
}

export const AddDish = () => {
    const { restaurantId } = useParams<'restaurantId'>();
    const history = useNavigate();
    const [createDishMutation, { loading, error }] = useMutation<
        createDish,
        createDishVariables
    >(CREATE_DISH_MUTATION, {
        refetchQueries: [
            {
                query: MY_RESTAURANT_QUERY,
                variables: {
                    input: {
                        id: +restaurantId!,
                    },
                },
            },
        ],
    });
    const { register, handleSubmit, formState, getValues, setValue } =
        useForm<IForm>({
            mode: 'onChange',
        });
    const onSubmit = () => {
        const { name, price, description, ...rest } = getValues();
        const optionObjects = optionsNumber.map((theId) => ({
            name: rest[`${theId}-optionName`],
            extra: +rest[`${theId}-optionExtra`],
        }));
        createDishMutation({
            variables: {
                input: {
                    name,
                    price: +price,
                    description,
                    restaurantId: +restaurantId!,
                    options: optionObjects,
                },
            },
        });
        console.log(error);
        history(-1);
    };
    const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
    const onAddOptionClick = () => {
        setOptionsNumber((current) => [Date.now(), ...current]);
    };
    const onDeleteClick = (idToDelete: number) => {
        setOptionsNumber((current) =>
            current.filter((id) => id !== idToDelete)
        );
        setValue(`${idToDelete}-optionName`, '');
        setValue(`${idToDelete}-optionExtra`, '');
    };
    return (
        <div className="container flex flex-col items-center mt-52">
            <Helmet>
                <title>Add Dish | Nuber Eats</title>
            </Helmet>
            <h4 className="mb-3 text-2xl font-semibold">Add Dish</h4>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid w-full max-w-screen-sm gap-3 mt-5 mb-5"
            >
                <input
                    {...register('name', { required: 'Name is required.' })}
                    className="input"
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                <input
                    {...register('price', { required: 'Price is required.' })}
                    className="input"
                    type="number"
                    name="price"
                    min={0}
                    placeholder="Price"
                />
                <input
                    {...register('description', {
                        required: 'Description is required.',
                    })}
                    className="input"
                    type="text"
                    name="description"
                    placeholder="Description"
                />
                <div className="my-10">
                    <h4 className="mb-3 text-lg font-medium">Dish Options</h4>
                    <span
                        onClick={onAddOptionClick}
                        className="px-2 py-1 mt-5 text-white bg-gray-900 cursor-pointer bg-"
                    >
                        Add Dish Option
                    </span>
                    {optionsNumber.length !== 0 &&
                        optionsNumber.map((id) => (
                            <div key={id} className="mt-5">
                                <input
                                    {...register(`${id}-optionName`)}
                                    name={`${id}-optionName`}
                                    className="px-4 py-2 mr-3 border-2 focus:outline-none focus:border-gray-600"
                                    type="text"
                                    placeholder="Option Name"
                                />
                                <input
                                    {...register(`${id}-optionExtra`)}
                                    name={`${id}-optionExtra`}
                                    className="px-4 py-2 border-2 focus:outline-none focus:border-gray-600"
                                    type="number"
                                    min={0}
                                    placeholder="Option Extra"
                                />
                                <span
                                    className="px-4 py-3 mt-5 ml-3 text-white bg-red-500 cursor-pointer bg-"
                                    onClick={() => onDeleteClick(id)}
                                >
                                    Delete Option
                                </span>
                            </div>
                        ))}
                </div>
                <Button
                    loading={loading}
                    canClick={formState.isValid}
                    actionText="Create Dish"
                />
            </form>
        </div>
    );
};
