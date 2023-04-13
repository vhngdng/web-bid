/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
import { motion } from 'framer-motion';
import { useGetAllDetailsPropertyQuery } from '~/app/service/property.service';
import { arrowDownImage, arrowUpImage } from '~/assets';
import CustomModal from './CustomModal';
function PropertyDetails() {
    const { propertyId } = useParams();
    const { data, isLoading } = useGetAllDetailsPropertyQuery(propertyId);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [imageListShow, setImageListShow] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [indexImage, setIndexImage] = useState(0);
    useEffect(() => {
        if (!!data) {
            setImages([...data.images]);
        }
    }, [data]);
    useEffect(() => {
        if (
            !!data &&
            !!data.images &&
            data.images.some((i) => i.type === 'PROPERTY')
        ) {
            setIndexImage(
                data.images.indexOf(
                    data.images.find((i) => i.type === 'PROPERTY'),
                ),
            );
        }
    }, [images]);
    useEffect(() => {
        if (images.length > 5) {
            let lastIndexShowImage =
                indexImage + 5 > images.length - 1
                    ? images.length - 5 - indexImage
                    : indexImage + 4;
            setImageListShow([...images.slice(indexImage, lastIndexShowImage)]);
        } else {
            setImageListShow([...images]);
        }
    }, [indexImage, images]);
    useEffect(() => {
        if (files.length > 0) setIsOpen((prev) => !prev);
    }, [files]);
    if (isLoading) return <Loader />;
    console.log(data);
    console.log(indexImage);
    console.log('images length', images.length);
    console.log('imageListShow', imageListShow);
    const handleChangeIndex = (index) => {
        console.log('index', index);
        if (index < 0) {
            setIndexImage(images.length - 1);
        } else if (index > images.length - 1) {
            setIndexImage(0);
        } else {
            setIndexImage(index);
        }
    };
    const handleFileInputChange = (e) => {
        setFiles([...e.target.files]);
        console.log(e);
    };
    console.log(files);
    return (
        <>
            <section className="pt-12 pb-24 bg-blueGray-100 rounded-b-10xl overflow-hidden max-w-screen min-w-full">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                            <div className="flex -mx-4 flex items-center justify-between lg:justify-start lg:items-start xl:items-center">
                                <div className="w-full sm:w-auto min-w-max px-4 text-center flex sm:flex-col items-center justify-center">
                                    <div
                                        className="cursor-pointer inline-block sm:mb-12 mr-4 sm:mr-0 transform -rotate-90 sm:transform-none hover:text-darkBlueGray-400"
                                        onClick={() =>
                                            handleChangeIndex(indexImage - 1)
                                        }
                                    >
                                        <img src={arrowUpImage.logo.default} />
                                    </div>
                                    <div>
                                        {imageListShow.map((image, index) => (
                                            <div
                                                className={`cursor-pointer h-30 block mb-4 mr-2 sm:mr-0 
                                                    ${
                                                        images.indexOf(
                                                            image,
                                                        ) === indexImage
                                                            ? 'ring-offset-2 ring-blue-300 ring-2'
                                                            : ''
                                                    }`}
                                                onClick={() =>
                                                    handleChangeIndex(index)
                                                }
                                                key={index}
                                            >
                                                <img
                                                    className="object-cover h-24 w-48"
                                                    src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
                                                    alt={data.property.name}
                                                />
                                                <div>{index}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        className="cursor-pointer inline-block transform -rotate-90 sm:transform-none hover:text-darkBlueGray-400"
                                        onClick={() =>
                                            handleChangeIndex(indexImage + 1)
                                        }
                                    >
                                        <img
                                            src={arrowDownImage.logo.default}
                                        />
                                    </div>
                                </div>
                                <div className="w-full sm:w-9/12 px-4">
                                    {images.length > 0 && (
                                        <img
                                            className="mb-5 object-fill h-full w-full"
                                            src={`${DOMAIN_URL}api/v1/images/read/${images[indexImage].id}`}
                                            alt=""
                                        />
                                    )}
                                    <p className="text-sm text-gray-300">
                                        Roll over image to zoom in
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="max-w-4xl mb-6">
                                <span className="text-s text-gray-400 tracking-wider">
                                    {!!data && `# ${data.property.id}`}
                                </span>
                                <h2 className=" mt-6 mb-4 text-5xl md:text-7xl lg:text-8xl font-heading font-medium">
                                    {!!data &&
                                        `${data.property.name} (${data.property.category})`}
                                </h2>
                                <h2 className=" mt-6 mb-4 text-3xl md:text-7xl lg:text-6xl text-blue-rgb font-heading font-medium">
                                    {!!data &&
                                        `owner - ${data.property.owner.username}`}
                                </h2>
                                <p className="flex items-center mb-6">
                                    <span className="mr-2 text-m text-blue-500 font-medium">
                                        $
                                    </span>
                                    <span className="text-3xl text-blue-500 font-medium">
                                        {!!data && data.property.reserveprice}
                                    </span>
                                </p>
                                <p className="text-lg text-gray-500">
                                    {!!data.property.description
                                        ? data.property.description
                                        : 'No description yet'}
                                </p>
                            </div>

                            <div className="mb-10">
                                <h4 className="mb-3 font-heading font-medium">
                                    Qty:
                                </h4>
                                <input
                                    className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                                    type="text"
                                    placeholder={
                                        !!data.property.quantity
                                            ? data.property.quantity
                                            : '1'
                                    }
                                />
                            </div>
                            <div className="flex flex-wrap -mx-2 mb-12">
                                <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                                    <div
                                        className="cursor-pointer block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl"
                                        href="#"
                                    >
                                        Property Registration
                                    </div>
                                </div>
                                <motion.div className="w-full md:w-1/3 px-2">
                                    <label
                                        className="cursor-pointer flex w-full py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
                                        form="file_input"
                                        htmlFor="image"
                                    >
                                        Upload Multiple Image
                                        <input
                                            className="hidden"
                                            id="image"
                                            type="file"
                                            multiple
                                            onChange={(e) =>
                                                handleFileInputChange(e)
                                            }
                                        />
                                    </label>
                                </motion.div>
                            </div>
                            <div>
                                <h4 className="mb-6 font-heading font-medium">
                                    More information
                                </h4>
                                <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                                    <h3 className="text-lg font-heading font-medium">
                                        Shipping &amp; returns
                                    </h3>
                                    <span>
                                        <svg
                                            width="12"
                                            height="8"
                                            viewBox="0 0 12 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                                                fill="black"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                                <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                                    <h3 className="text-lg font-heading font-medium">
                                        Product details
                                    </h3>
                                    <span>
                                        <svg
                                            width="12"
                                            height="8"
                                            viewBox="0 0 12 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                                                fill="black"
                                            ></path>
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CustomModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setFiles={setFiles}
                files={files}
            />
        </>
    );
}

export default PropertyDetails;
