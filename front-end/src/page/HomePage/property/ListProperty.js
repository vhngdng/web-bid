/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import { Pagination } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '~/Loader';
import { useLazyGetListPropertyForGuestQuery } from '~/app/service/property.service';
import Property from '../components/Property';
import { IMaskInput } from 'react-imask';

function ListProperty() {
    // eslint-disable-next-line no-unused-vars
    const [url, setUrl] = useState('');
    const [page, setPage] = useState(1);
    const [properties, setProperties] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [toggleGreaterThan, setToggleGreaterThan] = useState(true);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [reservePrice, setReservePrice] = useState(0);
    const ref = useRef(null);
    const inputRef = useRef(null);
    const [getListPropertyForGuest, { data, isLoading }] =
        useLazyGetListPropertyForGuestQuery();

    useEffect(() => {
        getListPropertyForGuest(url);
    }, [url]);
    useEffect(() => {
        if (!!data && data.content.length > 0) {
            setProperties([...data.content]);
        } else {
            setProperties([]);
        }
    }, [data]);

    useEffect(() => {
        page > 1
            ? setUrl((prev) => prev + `&page=${page - 1}`)
            : setUrl(url ? url : '');
    }, [page]);
    useEffect(() => {
        console.log(reservePrice);
    }, [reservePrice]);
    if (isLoading) return <Loader />;
    const handleUrl = () => {
        setUrl('');
        !!name && setUrl((prev) => prev + `&name=${name}`);
        !!category && setUrl((prev) => prev + `&category=${category}`);
        !!ownerName && setUrl((prev) => prev + `&ownerName=${ownerName}`);
        !!reservePrice &&
            setUrl(
                (prev) =>
                    prev +
                    `&reservePrice=${reservePrice}` +
                    `${toggleGreaterThan ? ',greater' : ',less'}`,
            );
    };
    const handleReset = () => {
        setUrl('');
        setName('');
        setCategory('');
        setOwnerName('');
        setReservePrice('');
    };
    console.log(data);
    console.log(url);
    return (
        <div className="w-full flex justify-start">
            <div className="flex justify-center w-full min-h-75vh">
                <div className="flex justify-center min-h-full w-2/3 ">
                    <div className="bg-white/50 mt-10 rounded-lg min-w-70vw">
                        <div className="w-full my-10">
                            <div className="mr-10 ">
                                <div className="w-full flex justify-between">
                                    <div className="flex justify-between items-center">
                                        <h2 className="ml-8 text-6xl italic text-extrabold">
                                            Properties
                                        </h2>
                                    </div>
                                    <div
                                        className={`inline-block m-2 p-4 w-1/2 ${
                                            isSearch &&
                                            'bg-gray-400/50 rounded-lg'
                                        }`}
                                    >
                                        <div className="text-end">
                                            <button
                                                onClick={() => handleReset()}
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Reset
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setIsSearch((prev) => !prev)
                                                }
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Filter
                                            </button>
                                        </div>
                                        {isSearch && (
                                            <>
                                                <div className="flex space-x-2 my-2 bg-white/30 rounded-r-lg">
                                                    <div className="w-1/2 flex items-center pl-2">
                                                        Name
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Property Name"
                                                        defaultValue={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex space-x-2 my-2 bg-white/30 rounded-r-lg">
                                                    <div className="w-1/2 flex items-center pl-2">
                                                        Category
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Category"
                                                        defaultValue={category}
                                                        onChange={(e) =>
                                                            setCategory(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex space-x-2 my-2 bg-white/30 rounded-r-lg">
                                                    <div className="w-1/2 flex items-center pl-2">
                                                        Owner Name
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Owner"
                                                        defaultValue={ownerName}
                                                        onChange={(e) =>
                                                            setOwnerName(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex space-x-2 my-2 bg-white/30 rounded-r-lg">
                                                    <div className="relative w-1/2 flex items-center pl-2">
                                                        <button
                                                            className="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36"
                                                            type="button"
                                                            onClick={() =>
                                                                setToggleGreaterThan(
                                                                    (prev) =>
                                                                        !prev,
                                                                )
                                                            }
                                                        >
                                                            {toggleGreaterThan
                                                                ? 'Greater than'
                                                                : 'Less than'}
                                                            <svg
                                                                className={`w-4 h-4 ml-2 ${
                                                                    toggleGreaterThan
                                                                        ? '-rotate-90'
                                                                        : 'rotate-90'
                                                                }`}
                                                                aria-hidden="true"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M19 9l-7 7-7-7"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <IMaskInput
                                                        mask={Number}
                                                        radix="."
                                                        value={String(
                                                            reservePrice,
                                                        )}
                                                        unmask={true} // true|false|'typed'
                                                        ref={ref}
                                                        inputRef={inputRef}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Price"
                                                        defaultValue={
                                                            reservePrice
                                                        }
                                                        onAccept={(
                                                            value,
                                                            mask,
                                                        ) =>
                                                            setReservePrice(
                                                                value,
                                                            )
                                                        }
                                                        pattern="[0-9]"
                                                    />
                                                </div>
                                                <div className="relative text-center">
                                                    <button
                                                        onClick={() =>
                                                            handleUrl()
                                                        }
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="space-y-10">
                                <div className="h-full flex flex-wrap justify-around">
                                    {properties.length > 0 ? (
                                        properties.map((property, index) => (
                                            <Property
                                                key={index}
                                                property={property}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-3xl text-center">
                                            The result not found
                                        </div>
                                    )}
                                </div>
                            </div>
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
            </div>
        </div>
    );
}

export default ListProperty;
