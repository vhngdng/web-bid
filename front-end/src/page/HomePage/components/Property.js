/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { DOMAIN_URL } from '~/CONST/const';
import ship from '~/assets/images/ship.jpg';
import { NumericFormat } from 'react-number-format';
import formatDateTime from '~/utils/formatDateTime';
import { useNavigate } from 'react-router-dom';
function Property({ property }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`${property.id}`)}
            className="cursor-pointer my-4 rounded-lg shadow-2xl"
        >
            <div className="h-50vh w-15vw">
                <div className="w-full h-1/2 flex justify-center items-center p-2">
                    <img
                        src={
                            !!property.imageProperty
                                ? `${DOMAIN_URL}api/v1/images/read/${property.imageProperty}`
                                : ship
                        }
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                <div className="text-start h-1/2 px-4 space-y-1 rounded-b-lg">
                    <div className="text-xl font-semibold">{property.name}</div>
                    <div className="text-gray-700 italic">
                        ({property.category})
                    </div>
                    <div>
                        <span>Reserve Price: </span>
                        <NumericFormat
                            className="text-center title-font font-semibold lg:text-xl hover:text-red-rgb"
                            value={property.reservePrice}
                            displayType={'text'}
                            thousandSeparator={true}
                            allowLeadingZeros
                            prefix={'$'}
                        />
                    </div>
                    <div>
                        <span className="">Created At: </span>{' '}
                        <span className="italic">
                            {formatDateTime(property.createdAt).date}
                        </span>
                    </div>
                    <div>
                        <span>Owner: </span>
                        <span className="text-blue-800">
                            {property.owner.name}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Property;
