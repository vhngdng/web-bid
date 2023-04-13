/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from 'react';
import { useGetAllPropertyByUserLoginQuery } from '~/app/service/property.service';
import Loader from '~/Loader';
import { imageDefault } from '~/assets';
import { useState } from 'react';
import UpdatePropertyDetailModal from '../UpdatePropertyDetailModal';
import { useRef } from 'react';
import { DOMAIN_URL } from '~/CONST/const';
import { useNavigate } from 'react-router-dom';
function PropertyList() {
    const { data, isLoading, refetch } = useGetAllPropertyByUserLoginQuery();
    const [properties, setProperties] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [propertyToUpdate, setPropertyToUpdate] = useState();
    const ref = useRef(null);
    const navigate = useNavigate();
    console.log(data);
    useEffect(() => {
        if (!!data) {
            setProperties(data);
        }
    }, [data]);

    if (isLoading) return <Loader />;

    const handleOpenModal = (property) => {
        setPropertyToUpdate(property);
        // setOpenModal(true);
        navigate(`/profile-detail/propertyDetails/${property.id}`);
    };

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Your properties
                    </h2>

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
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href="#">
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute inset-0"
                                                    ></span>
                                                    {property.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {property.name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                ${property.reservePrice}
                                            </p>
                                            <p
                                                className={`text-sm  ${
                                                    property.permission ===
                                                    'ACCEPTED'
                                                        ? 'text-green-700'
                                                        : property.permission ===
                                                          'REFUSED'
                                                        ? 'text-red-700'
                                                        : 'text-yellow-700'
                                                }`}
                                            >
                                                {property.permission}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        <div className="group relative">
                            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                    alt="Front of men&#039;s Basic Tee in black."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            ></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Black
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    $35
                                </p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                    alt="Front of men&#039;s Basic Tee in black."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            ></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Black
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    $35
                                </p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                    alt="Front of men&#039;s Basic Tee in black."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            ></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Black
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    $35
                                </p>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                    alt="Front of men&#039;s Basic Tee in black."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            ></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Black
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    $35
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UpdatePropertyDetailModal
                property={propertyToUpdate}
                appElement={ref.current}
                open={openModal}
                setOpen={setOpenModal}
                refetch={refetch}
            />
        </>
    );
}

export default PropertyList;
