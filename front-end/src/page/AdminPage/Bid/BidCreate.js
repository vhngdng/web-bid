/* eslint-disable no-extra-boolean-cast */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox, Button, Typography, Radio } from '@material-tailwind/react';
import PropertyModal from './Modal/PropertyModal';
import { useCreateBidMutation } from '~/app/service/bid.service';
// import classNames from 'classnames/bind';
import SimpleMdeReact from 'react-simplemde-editor';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLazyGetImageByPropertyTypePropertyQuery } from '~/app/service/image.service';
import Loader from '~/Loader';
import { DOMAIN_URL } from '~/CONST/const';
// import styles from './BidCreate.module.scss';
// const cx = classNames.bind(styles);
function BidCreate() {
    const [fetchImage, { data, isLoading: loadImage }] =
        useLazyGetImageByPropertyTypePropertyQuery();
    const navigate = useNavigate();
    const [createBid] = useCreateBidMutation();
    const [dateTime, setDateTime] = useState('');
    const [property, setProperty] = useState({});
    const [imageId, setImageId] = useState(null);
    const [reservePrice, setReservePrice] = useState('');
    const [priceStep, setPriceStep] = useState('');
    const [conditionReport, setConditionReport] = useState('');
    const [type, setType] = useState('PRIVATE');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (property.id) {
            handleFetchImage(property.id);
        }
        if (!!property) {
            console.log('selected property', property);
            setReservePrice(property.reservePrice);
        }
    }, [property]);
    const handleFetchImage = useCallback(
        async (id) => {
            await fetchImage(id);
            setImageId(data.id);
        },
        [property],
    );

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value);
    };
    console.log(dateTime);
    console.log(open);
    console.log(property);
    const handleCreate = () => {
        createBid({
            type,
            dayOfSale: dateTime,
            conditionReport,
            reservePrice,
            priceStep,
            propertyId: property.id,
        })
            .unwrap()
            .then(() => {
                toast.success('Create bid success');
                setTimeout(() => {
                    navigate('/admin/open-bid');
                }, 1000);
            })
            .catch((err) => toast.error(err));
    };
    if (loadImage) return <Loader />;
    console.log(imageId);
    return (
        <div className="flex justify-center mx-12 my-12 bg-gray-200/20 h-full w-full rounded-lg shadow-2xl">
            <div className="px-6 py-6">
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="text-center"
                >
                    Create Bid Room
                </Typography>
                <Typography
                    color="gray"
                    className="text-center mt-1 font-normal"
                >
                    Enter your details to create.
                </Typography>
                <form
                    className="mt-8 mb-2 w-2/3 max-w-screen-xl sm:w-96"
                    ref={ref}
                >
                    <div className="mb-4 flex flex-col gap-6">
                        <div className="relative z-0">
                            <input
                                type="text"
                                id="floating_standard"
                                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-500/50 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
                                placeholder=" "
                                defaultValue={property.name}
                                onClick={() => {
                                    setOpen((prev) => !prev);
                                }}
                            />
                            <label
                                form="floating_standard"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Property
                            </label>
                        </div>
                        <PropertyModal
                            appElement={ref.current}
                            open={open}
                            setOpen={setOpen}
                            setProperty={setProperty}
                        />
                        {property.category && property.owner && (
                            <>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="floating_outlined"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-500/50 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
                                        placeholder=" "
                                        value={property.category}
                                    />
                                    <label
                                        form="floating_outlined"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Category
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="floating_outlined"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-500/50 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
                                        placeholder=" "
                                        value={
                                            property.owner.username ||
                                            property.owner.email
                                        }
                                    />
                                    <label
                                        form="floating_outlined"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Owner
                                    </label>
                                </div>

                                <label>conditionReport</label>
                                <SimpleMdeReact
                                    value={
                                        !!property.description
                                            ? property.description
                                            : 'No description'
                                    }
                                    onChange={(value) =>
                                        setConditionReport(value)
                                    }
                                />
                                {data && (
                                    <img
                                        alt="Photo avatar"
                                        src={`${DOMAIN_URL}api/v1/images/read/${property.imageId}`}
                                        className="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1"
                                    />
                                )}
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="floating_outlined"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-500/50 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
                                        placeholder=" "
                                        defaultValue={reservePrice}
                                        onChange={(e) =>
                                            setReservePrice(e.target.value)
                                        }
                                    />
                                    <label
                                        form="floating_outlined"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Reserve Price
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="floating_outlined"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-indigo-500/50 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-indigo-800 peer"
                                        placeholder=" "
                                        defaultValue={priceStep}
                                        onChange={(e) =>
                                            setPriceStep(e.target.value)
                                        }
                                    />
                                    <label
                                        form="floating_outlined"
                                        className="absolute text-sm text-gray-500 dark:text-gray-400 rounded-lg duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Price Step
                                    </label>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="datetime"
                            className="text-lg font-medium"
                        >
                            DAY OF SALE :
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="datetime"
                            value={dateTime}
                            onChange={handleDateTimeChange}
                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            min={new Date().toISOString().split('.')[0]}
                        />
                    </div>
                    <div className="flex gap-10">
                        <Radio
                            id="public-type-bid"
                            name="type"
                            label="Public"
                            value="PUBLIC"
                            onChange={(e) => setType(e.target.value)}
                        />
                        <Radio
                            id="hidden-type-bid"
                            name="type"
                            label="Private"
                            value="PRIVATE"
                            onChange={(e) => setType(e.target.value)}
                            defaultChecked
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-blue-500"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: '-ml-2.5' }}
                    />
                    <Button
                        className="mt-6"
                        fullWidth
                        onClick={() => handleCreate()}
                    >
                        Create
                    </Button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default BidCreate;
