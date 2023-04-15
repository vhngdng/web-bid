/* eslint-disable no-extra-boolean-cast */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
import { useGetAllPropertyQuery } from '~/app/service/property.service';
import { imageDefault } from '~/assets';

function AdminPropertyList() {
    const { data: properties, isLoading } = useGetAllPropertyQuery();
    const [permission, setPermission] = useState('ALL');
    const navigate = useNavigate();

    if (isLoading) return <Loader />;
    const handleOpenModal = (property) => {
        navigate(`${property.id}`);
    };
    console.log(properties);

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h2 className="text-center w-96 text-2xl font-bold tracking-tight text-gray-900">
                            Properties
                        </h2>
                        <div className="flex">
                            <div className=" bg-gray-100 px-4 w-72 space-x-4 rounded-lg">
                                <input
                                    className=" bg-gray-100 outline-none"
                                    type="text"
                                    placeholder="Article name or keyword..."
                                />
                            </div>
                            <div className="justify-end items-center rounded-lg space-x-4">
                                <div className="ml-4">
                                    <select
                                        value={permission}
                                        onChange={(e) =>
                                            setPermission(e.target.value)
                                        }
                                        className="text-center rounded border appearance-none border-gray-400 focus:outline-none focus:border-red-500 text-m m-auto px-2 py-3"
                                    >
                                        <option
                                            className="text-black "
                                            value="ALL"
                                        >
                                            ALL
                                        </option>
                                        <option
                                            className="text-black "
                                            value="NOTCHECK"
                                        >
                                            NOTCHECK
                                        </option>
                                        <option
                                            className="text-black"
                                            value="REFUSED"
                                        >
                                            REFUSE
                                        </option>
                                        <option
                                            className="text-black"
                                            value="ACCEPTED"
                                        >
                                            ACCEPT
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {!!properties &&
                            properties.map((property, index) => (
                                <div
                                    onClick={() => handleOpenModal(property)}
                                    key={index}
                                    className="group relative"
                                >
                                    <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={
                                                !!property.imageId
                                                    ? `${DOMAIN_URL}api/v1/images/read/${property.imageId}`
                                                    : `${imageDefault.logo.default}`
                                            }
                                            alt={property.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between max-w-xs">
                                        <div className="mr-2">
                                            <h3 className="text-sm text-blue-500 truncate">
                                                <div className="truncate">
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0"
                                                    ></span>
                                                    #{property.id}{' '}
                                                    {property.name}
                                                </div>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 truncate">
                                                ({property.category})
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Quantity :{' '}
                                                {!!property.quantity
                                                    ? property.quantity
                                                    : 1}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ${property.reservePrice}
                                            </p>
                                            <p
                                                className={`mt-1 text-sm  ${
                                                    property.permission ===
                                                    'ACCEPTED'
                                                        ? 'text-green-700'
                                                        : property.permission ===
                                                          'REFUSED'
                                                        ? 'text-red-700'
                                                        : 'text-yellow-700'
                                                }`}
                                            >
                                                {!!property.permission
                                                    ? property.permission
                                                    : 'NOTCHECK'}
                                            </p>

                                            <h3 className="mt-1 text-sm text-gray-700">
                                                <a href="#">
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0"
                                                    ></span>
                                                    #{property.owner.id} -
                                                    {property.owner.username}
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPropertyList;
