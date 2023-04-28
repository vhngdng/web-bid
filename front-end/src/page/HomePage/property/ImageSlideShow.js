/* eslint-disable no-extra-boolean-cast */
import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { DOMAIN_URL } from '~/CONST/const';
import formatDateTime from '~/utils/formatDateTime';
import { motion } from 'framer-motion';

function ImageSlideShow({
    images,
    name,
    category,
    propertyId,
    createdAt,
    quantity,
    reservePrice,
}) {
    const [indexImage, setIndexImage] = useState(0);
    return (
        <div className="w-full">
            <div className="flex justify-between p-3">
                <div className="w-30vw h-50vh p-3 bg-white/30 p-3 rounded-lg items-center">
                    <img
                        className="w-full h-full object-cover rounded-lg shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)]"
                        src={
                            images[indexImage].includes('static/media')
                                ? images[indexImage]
                                : `${DOMAIN_URL}api/v1/images/read/${images[indexImage].id}`
                        }
                    />
                </div>
                <motion.div
                    className="inline-block w-1/2 text-center space-y-2 space-x-4"
                    initial={{ opacity: 0, x: 200 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            delay: 0.5,
                            duration: 1,
                            ease: 'easeInOut',
                        },
                    }}
                >
                    <div className="text-4xl mt-5">{name}</div>
                    <div className="text-2xl text-gray-600 italic">
                        ({category})
                    </div>
                    <div className="text-2xl font-bold">Specifications</div>
                    <div className="flex flex-col justify-center items-center space-y-6">
                        <div className="w-2/3 flex justify-between items-center">
                            <div>Property Id:</div>
                            <div>{propertyId}</div>
                        </div>
                        <div className="w-2/3 flex justify-between items-center">
                            <div>Created At:</div>
                            <div>{formatDateTime(createdAt).date}</div>
                        </div>
                        <div className="w-2/3 flex justify-between items-center">
                            <div>Quantity: </div>
                            <div>{quantity}</div>
                        </div>
                        <div className="w-2/3 flex justify-between items-center">
                            <div>Reserve Price</div>
                            <NumericFormat
                                className="title-font font-medium text-2xl text-red-500 hover:scale-125"
                                value={!!reservePrice ? reservePrice : 0}
                                displayType={'text'}
                                thousandSeparator={true}
                                allowLeadingZeros
                                prefix={'$'}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
            <div className="flex flex-wrap mt-7">
                {images.length > 1 &&
                    images.map((image, index) => (
                        <div
                            className={`w-48 bg-white/30 h-48 rounded-lg m-3 p-3 cursor-pointer
                                                                ${
                                                                    images.indexOf(
                                                                        image,
                                                                    ) ===
                                                                    indexImage
                                                                        ? 'ring-offset-2 ring-blue-300 ring-2 shadow-[0_50px_25px_-24px_rgb(0,0,0,0.3)] rounded-lg'
                                                                        : 'contrast-50'
                                                                }`}
                            onClick={() => setIndexImage(images.indexOf(image))}
                            key={index}
                        >
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={image}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ImageSlideShow;
