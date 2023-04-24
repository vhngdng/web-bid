/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import { Pagination } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
import { useGetAllPropertyQuery } from '~/app/service/property.service';
import { imageDefault } from '~/assets';
import { NotificationContext } from '~/context/NotificationProvider';

function AdminPropertyList() {
    const [url, setUrl] = useState(null);
    const { data, isLoading, refetch } = useGetAllPropertyQuery(url);
    const [permission, setPermission] = useState('ALL');
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const { newNoti } = useContext(NotificationContext);
    useEffect(() => {
        if (!!data && data.content.length > 0) {
            setProperties([...data.content]);
        }
    }, [data]);
    useEffect(() => {
        if (page > 1) setUrl(`page=${page - 1}`);
    }, [page]);
    useEffect(() => {
        if (!!properties && newNoti.notification === 'PROPERTY') {
            const newProperties = properties;
            newProperties.map((property) => {
                if (property.id === newNoti.id) {
                    return {
                        ...property,
                        auctioneerPrice: newNoti.auctioneerPrice,
                        permission: newNoti.permission,
                        reservePrice: newNoti.reservePrice,
                    };
                }
                return property;
            });
            setProperties(newProperties);
        }
    }, [newNoti, properties]);
    // useEffect(() => {
    //     refetch();
    // }, [location]);
    if (isLoading) return <Loader />;
    const handleOpenModal = (property) => {
        navigate(`${property.id}`);
    };
    console.log(data);

    return (
        <>
            <div className="space-y-10 mt-10">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h2 className="text-center w-96 text-2xl font-bold tracking-tight text-gray-900">
                            Properties
                        </h2>
                        <div className="flex">
                            <div className=" px-4 w-72 space-x-4 ">
                                <input
                                    className=" bg-gray-100 outline-none rounded-lg"
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
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md group-hover:opacity-75 shadow-2xl">
                                        <img
                                            src={
                                                !!property.imageId
                                                    ? `${DOMAIN_URL}api/v1/images/read/${property.imageId}`
                                                    : `${imageDefault.logo.default}`
                                            }
                                            alt={property.name}
                                            className="w-full object-cover object-center lg:w-full"
                                        />
                                    </div>
                                    <div className="mt-4 flex justify-between max-w-xs break-words">
                                        <div className="mr-2 w-full">
                                            <h3 className="text-sm text-blue-500">
                                                <div className=" ">
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0"
                                                    ></span>
                                                    #{property.id}{' '}
                                                    {property.name}
                                                </div>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-700">
                                                ({property.category})
                                            </p>
                                            <p className="mt-1 text-sm text-gray-700">
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
                                                        : 'text-orange-700'
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
                    <div>
                        {data && !!data.totalPages && (
                            <Pagination
                                className="flex justify-center w-full my-10"
                                count={data.totalPages}
                                onChange={(event, value) => {
                                    setPage(value);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPropertyList;
