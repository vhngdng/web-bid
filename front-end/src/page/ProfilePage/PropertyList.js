/* eslint-disable no-extra-boolean-cast */
import React, { useEffect } from 'react';
import { useGetAllPropertyByUserLoginQuery } from '~/app/service/property.service';
import Loader from '~/Loader';
import { imageDefault } from '~/assets/images';
import { useUpdateTypeImageMutation } from '~/app/service/image.service';
import { useState } from 'react';
import UpdatePropertyDetailModal from './UpdatePropertyDetailModal';
import { useRef } from 'react';
function PropertyList() {
    const { data, isLoading, refetch } = useGetAllPropertyByUserLoginQuery();
    const [properties, setProperties] = useState();
    // eslint-disable-next-line no-unused-vars
    const [updateTypeImage] = useUpdateTypeImageMutation();
    const [openModal, setOpenModal] = useState(false);
    const [propertyToUpdate, setPropertyToUpdate] = useState();
    const ref = useRef(null);
    console.log(data);
    useEffect(() => {
        if (!!data) {
            setProperties(data);
        }
    }, [data]);

    if (isLoading) return <Loader />;

    const handleOpenModal = (property) => {
        setPropertyToUpdate(property);
        setOpenModal(true);
    };
    return (
        <>
            <div className="w-full max-w-2xl mx-auto bg-gray-200 shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Properties</h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table ref={ref} className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            Name
                                        </div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            Category
                                        </div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">
                                            Owner Email
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {!!properties &&
                                    properties.map((property, index) => (
                                        <tr
                                            className="cursor-pointer"
                                            key={index}
                                            onClick={() =>
                                                handleOpenModal(property)
                                            }
                                        >
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                                        <img
                                                            className="object-fill "
                                                            src={
                                                                !!property.imageId
                                                                    ? `http://localhost:8080/api/v1/images/read/${property.imageId}`
                                                                    : `${imageDefault.logo.default}`
                                                            }
                                                            width="40"
                                                            height="40"
                                                            alt="IMG"
                                                        />
                                                    </div>
                                                    <div className="font-medium text-gray-800">
                                                        {property.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left">
                                                    {property.category}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-left font-medium text-green-500">
                                                    {property.owner.email}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
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
