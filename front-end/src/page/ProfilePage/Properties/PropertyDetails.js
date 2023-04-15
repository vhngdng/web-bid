/* eslint-disable no-extra-boolean-cast */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
import {
    useGetAllDetailsPropertyQuery,
    useRegisterPropertyMutation,
} from '~/app/service/property.service';
import { arrowDownImage, arrowUpImage, setting } from '~/assets';
import CustomModal from './CustomModal';
import { ToastContainer, toast } from 'react-toastify';
function PropertyDetails() {
    const { propertyId } = useParams();
    const { data, isLoading } = useGetAllDetailsPropertyQuery(propertyId);
    const [registerProperty] = useRegisterPropertyMutation();
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [imageListShow, setImageListShow] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('private');
    const [isFixName, setIsFixName] = useState(false);
    const [isFixDescription, setIsFixDescription] = useState(false);
    const [insertPrice, setInsertPrice] = useState(false);
    const [reservePrice, setReservePrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    // eslint-disable-next-line no-unused-vars
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    // eslint-disable-next-line no-unused-vars
    const [indexImage, setIndexImage] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!!data) {
            setImages([...data.images]);
            setName(data.property.name);
            setReservePrice(data.property.reservePrice);
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
            indexImage + 4 > images.length
                ? setImageListShow([
                      ...images.slice(indexImage, images.length),
                      ...images.slice(0, 4 - images.length + indexImage),
                  ])
                : setImageListShow([
                      ...images.slice(indexImage, indexImage + 4),
                  ]);
        } else {
            setImageListShow([...images]);
        }
    }, [indexImage, images]);
    useEffect(() => {
        if (file != null) setIsOpen((prev) => !prev);
    }, [file]);

    useEffect(() => {
        console.log(name);
    }, [name]);
    if (isLoading) return <Loader />;
    console.log('data', data);

    const handleChangeIndex = (index) => {
        if (index < 0) {
            setIndexImage(images.length - 1);
        } else if (index > images.length - 1) {
            setIndexImage(0);
        } else {
            setIndexImage(index);
        }
    };
    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
        console.log(e);
    };

    const handleCancelChangeName = () => {
        setName(data.property.name);
        setIsFixName(false);
    };
    const handleCancelChangeDescription = () => {
        setDescription(data.property.description);
        setIsFixDescription(false);
    };
    // Not finished yet
    const handleShowFullImage = (id) => {
        setTimeout(() => {
            navigate(`${id}`);
        }, 2000);
    };

    const handlePropertyRegistration = async () => {
        try {
            const res = await registerProperty({
                propertyId,
                description,
                quantity,
                name,
                reservePrice,
                bidType: type,
            });
            console.log(res);
            toast.success('Property register successfully', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        } catch {
            (err) => console.log(err);
        }
    };
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
                                                    handleChangeIndex(
                                                        images.indexOf(image),
                                                    )
                                                }
                                                key={index}
                                            >
                                                <img
                                                    className="object-cover h-24 w-48"
                                                    src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
                                                    alt={data.property.name}
                                                />
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
                                <div
                                    className="w-full sm:w-9/12 px-4"
                                    onMouseEnter={() =>
                                        handleShowFullImage(
                                            images[indexImage].id,
                                        )
                                    }
                                >
                                    {images.length > 0 && (
                                        <img
                                            className="mb-5 object-fill h-full w-full"
                                            src={`${DOMAIN_URL}api/v1/images/read/${images[indexImage].id}`}
                                            alt=""
                                        />
                                    )}
                                    <p className="text-sm text-gray-300">
                                        Hover image to see full size
                                    </p>
                                </div>
                            </div>
                            <div className=" my-12 px-6 py-4">
                                <div className="flex justify-center items-center px-6 py-6">
                                    <span className="text-2xl px-4">
                                        Description
                                    </span>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setIsFixDescription((prev) => !prev)
                                        }
                                    >
                                        <img
                                            className="object-fit h-6 w-6"
                                            src={setting.logo.default}
                                        />
                                    </div>
                                </div>
                                {isFixDescription ? (
                                    <div
                                        className="relative mb-3 xl:w-96"
                                        data-te-input-wrapper-init
                                    >
                                        <textarea
                                            className="peer block min-h-[auto] w-full rounded border-0 bg-gray-400/20 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                            id="exampleFormControlTextarea1"
                                            rows="4"
                                            placeholder={name}
                                            defaultValue={
                                                !!data &&
                                                !!data.property.description
                                                    ? data.property.description
                                                    : description
                                                    ? description
                                                    : 'No Description'
                                            }
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        ></textarea>
                                        <div className="flex ">
                                            <div className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white">
                                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                                <span
                                                    className="relative"
                                                    onClick={() =>
                                                        setIsFixDescription(
                                                            (prev) => !prev,
                                                        )
                                                    }
                                                >
                                                    Confirm change
                                                </span>
                                            </div>
                                            <div
                                                onClick={
                                                    handleCancelChangeDescription
                                                }
                                                className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-gray-600 active:shadow-none shadow-lg bg-gradient-to-tl from-gray-600 to-gray-500 border-gray-700 text-white"
                                            >
                                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                                <span className="relative">
                                                    Cancel
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-lg text-center text-black">
                                        {!!data.property.description
                                            ? data.property.description
                                            : !!description
                                            ? description
                                            : 'No description'}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="max-w-4xl mb-6">
                                <span className="text-xl text-gray-600 tracking-wider">
                                    {!!data && `# ${data.property.id}`}
                                </span>
                                <div className="cursor-pointer">
                                    {isFixName ? (
                                        <>
                                            <div
                                                className="relative mb-3 xl:w-96"
                                                data-te-input-wrapper-init
                                            >
                                                <textarea
                                                    className="peer block min-h-[auto] w-full rounded border-0 bg-gray-400/20 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="exampleFormControlTextarea1"
                                                    rows="4"
                                                    placeholder={name}
                                                    defaultValue={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                ></textarea>
                                            </div>
                                            <div className="flex ">
                                                <div className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-blue-600 active:shadow-none shadow-lg bg-gradient-to-tr from-blue-600 to-blue-500 border-blue-700 text-white">
                                                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                                    <span className="relative">
                                                        Confirm change
                                                    </span>
                                                </div>
                                                <div
                                                    onClick={
                                                        handleCancelChangeName
                                                    }
                                                    className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-gray-600 active:shadow-none shadow-lg bg-gradient-to-tl from-gray-600 to-gray-500 border-gray-700 text-white"
                                                >
                                                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                                    <span className="relative">
                                                        Cancel
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <h2
                                            onClick={() =>
                                                setIsFixName((prev) => !prev)
                                            }
                                            className=" mt-6 mb-4 text-5xl md:text-7xl lg:text-8xl font-heading font-medium hover:text-gray-600 hover:font-sans"
                                        >
                                            {!!data &&
                                                `${name} (${data.property.category})`}
                                        </h2>
                                    )}
                                </div>
                                <h2 className=" mt-6 mb-4 text-3xl md:text-7xl lg:text-6xl font-sans text-blue-rgb font-heading font-medium">
                                    {!!data &&
                                        `${data.property.owner.username}`}
                                </h2>
                                <div className="flex items-center mb-6">
                                    {insertPrice ? (
                                        <div>
                                            <span>$ </span>
                                            <input
                                                className="w-28 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                                                autoFocus
                                                type="text"
                                                defaultValue={reservePrice}
                                                onChange={(e) =>
                                                    setReservePrice(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <span
                                            onClick={() => setInsertPrice(true)}
                                            className="cursor-pointer title-font font-medium text-2xl text-gray-900 hover:text-red-rgb hover:scale-90"
                                        >
                                            ${' '}
                                            {!!data.property.reservePrice
                                                ? data.property.reservePrice
                                                : 'No price'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-10">
                                <h4 className="mb-3 font-heading font-medium">
                                    Qty:
                                </h4>
                                <input
                                    className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                                    type="text"
                                    defaultValue={quantity}
                                    placeholder={
                                        !!data.property.quantity
                                            ? data.property.quantity
                                            : '1'
                                    }
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-10">
                                <h4 className="mb-3 font-heading font-medium">
                                    Type:
                                </h4>
                                <div>
                                    <div>
                                        <input
                                            type="radio"
                                            value="public"
                                            checked={type === 'public'}
                                            onChange={() => setType('public')}
                                        />
                                        <label
                                            className="px-4 py-4 text-xl"
                                            htmlFor="public"
                                        >
                                            Public
                                        </label>
                                        <p className="px-4 py-4 text-xl text-gray-600">
                                            Properties are sold in home page and
                                            automatically closed on fixed time
                                        </p>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value="private"
                                            checked={type === 'private'}
                                            onChange={() => setType('private')}
                                        />
                                        <label
                                            className="px-4 py-4 text-xl"
                                            htmlFor="private"
                                        >
                                            Private
                                        </label>
                                        <p className="px-4 py-4 text-xl text-gray-600">
                                            Properties are sold in the online
                                            bid room
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-2 mb-12">
                                <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
                                    <div
                                        onClick={handlePropertyRegistration}
                                        className="cursor-pointer block py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:bg-blue-600 rounded-xl"
                                    >
                                        Property Registration
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-2">
                                    <label
                                        className="cursor-pointer flex w-full py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
                                        form="file_input"
                                        htmlFor="image"
                                    >
                                        Upload Image
                                        <input
                                            className="hidden"
                                            id="image"
                                            type="file"
                                            onChange={(e) =>
                                                handleFileInputChange(e)
                                            }
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CustomModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setFile={setFile}
                file={file}
                setImages={setImages}
            />
            <ToastContainer />
        </>
    );
}

export default PropertyDetails;
