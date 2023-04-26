/* eslint-disable no-extra-boolean-cast */
import React, { useContext, useEffect } from 'react';
import { useGetAllPropertyByUserLoginQuery } from '~/app/service/property.service';
import Loader from '~/Loader';
import { imageDefault } from '~/assets';
import { useState } from 'react';
// import UpdatePropertyDetailModal from '../UpdatePropertyDetailModal';
// import { useRef } from 'react';
import { DOMAIN_URL } from '~/CONST/const';
import { useLocation, useNavigate } from 'react-router-dom';
import DeletePropertyModal from '~/component/layouts/Default/DeletePropertyModal';
import { NumericFormat } from 'react-number-format';
import { NotificationContext } from '~/context/NotificationProvider';
function PropertyList() {
    // eslint-disable-next-line no-unused-vars
    const { data, isLoading, refetch } = useGetAllPropertyByUserLoginQuery();
    const [properties, setProperties] = useState();
    // const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [idDelete, setIdDelete] = useState();
    // eslint-disable-next-line no-unused-vars
    const [propertyToUpdate, setPropertyToUpdate] = useState();
    const { newNoti } = useContext(NotificationContext);
    // const ref = useRef(null);
    const navigate = useNavigate();
    console.log(data);
    useEffect(() => {
        if (!!data) {
            setProperties(data);
        }
    }, [data]);
    useEffect(() => {
        if (!!properties && !!newNoti && newNoti.notification === 'PROPERTY') {
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
    useEffect(() => {
        refetch();
    }, [useLocation()]);

    if (isLoading) return <Loader />;

    const handleOpenModal = (property) => {
        setPropertyToUpdate(property);
        // setOpenModal(true);
        navigate(`/profile-detail/propertyDetails/${property.id}`);
    };

    const handleRemove = (id) => {
        setIdDelete(id);
        setOpenDeleteModal(true);
        console.log(id);
    };
    return (
        <>
            <div className="min-h-75vh min-w-70vw my-8 rounded-lg">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Your properties
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {!!properties &&
                            properties.map((property, index) => (
                                <div
                                    key={index}
                                    className="group relative rounded-lg bg-white/30 px-3"
                                >
                                    <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleOpenModal(property)
                                        }
                                    >
                                        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md lg:aspect-none group-hover:opacity-75 lg:h-80  shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]">
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
                                        <div className="mt-4 mx-2 flex justify-between">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <div className="text-blue-700">
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute inset-0"
                                                        ></span>
                                                        {property.name}
                                                    </div>
                                                </h3>
                                                <p className="mt-1 text-sm">
                                                    ({property.category})
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    <NumericFormat
                                                        className="text-center title-font font-medium text-xl text-red-500 hover:text-red-700 hover:scale-125"
                                                        value={
                                                            property.reservePrice
                                                        }
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        allowLeadingZeros
                                                        prefix={'$'}
                                                    />
                                                </p>
                                                <p
                                                    className={`text-sm  ${
                                                        property.permission ===
                                                        'ACCEPTED'
                                                            ? 'text-green-700'
                                                            : property.permission ===
                                                              'REFUSED'
                                                            ? 'text-red-700'
                                                            : 'text-red-rgb'
                                                    }`}
                                                >
                                                    {property.permission}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 ml-auto -mx-1.5 -my-1.5 text-gray-700 bg-gray-200/50 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                        data-dismiss-target="#toast-message-cta"
                                        aria-label="Close"
                                        onClick={() =>
                                            handleRemove(property.id)
                                        }
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* <UpdatePropertyDetailModal
                property={propertyToUpdate}
                appElement={ref.current}
                open={openModal}
                setOpen={setOpenModal}
                refetch={refetch}
            /> */}
            <DeletePropertyModal
                isOpen={openDeleteModal}
                setIsOpen={setOpenDeleteModal}
                isDelete={true}
                idDelete={idDelete}
                setIdDelete={setIdDelete}
                setProperties={setProperties}
            />
        </>
    );
}

export default PropertyList;
