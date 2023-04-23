/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from '~/Loader';
import { useLazySearchQuery } from '~/app/service/search.service';
import girl from '~/assets/images/luudiecphi.webp';
import formatDateTime from '~/utils/formatDateTime';
import readImage from '~/utils/readImage';
function Search() {
    const { keyword } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [fetchSearch, { data, isLoading }] = useLazySearchQuery();
    const [key, setKey] = useState();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        setKey(keyword);
        !!searchParams.get('page') && parseInt(searchParams.get('page')) > 1
            ? setPage(parseInt(searchParams.get('page')))
            : setPage(1);
    }, [keyword, searchParams]);
    useEffect(() => {
        !!key &&
            fetchSearch({
                keyword: key,
                page,
            });
    }, [key, page]);
    if (isLoading) return <Loader />;
    console.log(data);
    console.log(keyword);
    console.log(searchParams.get('page'));
    return (
        <div className="w-70vw min-h-75vh flex justify-center space-x-5 mx-10 my-10 ">
            <div className="w-full h-full rounded-lg shadow-lg">
                <div className="flex flex-wrap items-center space-y-2">
                    {!!data &&
                        data.content.map((result, index) => (
                            <div key={index} className="py-4">
                                {result.typeSearch === 'BID' ? (
                                    <div
                                        onClick={() =>
                                            navigate(`/bid-room/${result.id}`)
                                        }
                                        className="cursor-pointer w-15vw h-45vh inline-block mx-5 rounded-lg shadow-lg"
                                    >
                                        <div className="w-full h-1/2 my-5">
                                            <img
                                                src={
                                                    !!result.property
                                                        .imageProperty
                                                        ? readImage(
                                                              result.property
                                                                  .imageProperty,
                                                          )
                                                        : girl
                                                }
                                                className="w-full h-full object-cover rounded-lg shadow-2xl"
                                            />
                                        </div>
                                        <div className="h-1/2 mx-1 px-2">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span>Bid Id: </span>
                                                    <span>{result.id}</span>
                                                </div>
                                                <div>
                                                    <span>Property Id: </span>
                                                    <span>
                                                        {result.property.id}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="">
                                                    Property:{'  '}
                                                </span>
                                                <span className="font-xl">
                                                    {result.property.name}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="">
                                                    Status:{'  '}
                                                </span>
                                                <span
                                                    className={`${
                                                        result.status ===
                                                        'SUCCESS'
                                                            ? 'text-green-600'
                                                            : 'text-orange-700'
                                                    }`}
                                                >
                                                    {result.status}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="">
                                                    Day of Sale:{'  '}
                                                </span>
                                                <span className="font-semibold">
                                                    {
                                                        formatDateTime(
                                                            result.dayOfSale,
                                                        ).date
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() =>
                                            navigate(
                                                `/list-property/${result.id}`,
                                            )
                                        }
                                        className="cursor-pointer w-15vw h-45vh inline-block mx-5 rounded-lg shadow-lg"
                                    >
                                        <div className="w-full h-1/2 my-5">
                                            <img
                                                src={
                                                    !!result.imageProperty
                                                        ? readImage(
                                                              result.imageProperty,
                                                          )
                                                        : girl
                                                }
                                                className="w-full h-full object-cover rounded-lg shadow-2xl"
                                            />
                                        </div>
                                        <div className="h-1/2 mx-1 px-2">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span>Property</span>
                                                    <span>{result.name}</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {' '}
                                                        ({result.category})
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className="">
                                                    Id:{'  '}
                                                </span>
                                                <span className="font-xl">
                                                    {result.id}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="">
                                                    Quantity:{'  '}
                                                </span>
                                                <span className="font-xl">
                                                    {result.quantity}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="">
                                                    Reserve Price:{'  '}
                                                </span>
                                                <NumericFormat
                                                    className=" text-center title-font font-medium text-xl text-red-rgb hover:text-red-rgb hover:scale-125"
                                                    value={result.reservePrice}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    allowLeadingZeros
                                                    prefix={'$'}
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <div className="h-12 w-12 px-2">
                                                    <img
                                                        className="object-cover w-full rounded-full"
                                                        src={
                                                            !!result.owner
                                                                .avatar
                                                                ? readImage(
                                                                      result
                                                                          .owner
                                                                          .avatar,
                                                                  )
                                                                : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                        }
                                                    />
                                                </div>
                                                <span className="">
                                                    {result.owner.name}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
                {data && !!data.totalPages && (
                    <Pagination
                        className="flex justify-center w-full mt-4 pb-4"
                        count={data.totalPages}
                        page={page}
                        onChange={(event, value) =>
                            navigate(
                                value > 1
                                    ? `/search/${key}?page=${value}`
                                    : `/search/${key}`,
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default Search;
