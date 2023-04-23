/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loader from '~/Loader';
import { useSearchQuery } from '~/app/service/search.service';
import girl from '~/assets/images/luudiecphi.webp';
import readImage from '~/utils/readImage';
function Search() {
    const { keyword } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    // eslint-disable-next-line no-unused-vars
    // useEffect(() => {
    //     !!searchParams.get('page') &&
    //         parseInt(searchParams.get('page')) > 1 &&
    //         setPage(parseInt(searchParams.get('page')));
    // }, []);
    const { data, isLoading } = useSearchQuery({
        keyword,
        page: null,
    });
    const navigate = useNavigate();

    if (isLoading) return <Loader />;
    console.log(data);
    console.log(keyword);
    console.log(searchParams.get('page'));
    return (
        <div className="w-70vw min-h-75vh flex justify-center space-x-5 mx-10 my-10 ">
            <div className="w-full bg-white h-full rounded-lg shadow-2xl">
                <div className="flex flex-wrap items-center space-y-2">
                    {!!data &&
                        data.content.map((result, index) => (
                            <div key={index} className="py-4">
                                {result.typeSearch === 'BID' ? (
                                    <div
                                        className="cursor-pointer w-15vw h-50vh inline-block mx-5 bg-gray-200 rounded-lg shadow-2xl"
                                        onClick={navigate('')}
                                    >
                                        <div className="w-full h-1/2">
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
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="h-1/2 mx-2">
                                            <div className="flex justify-between items-center font-sans">
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
                                                <span>Status: </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-15vw h-50vh mx-5 bg-gray-200 rounded-lg shadow-2xl">
                                        Property
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
                {/* {data && !!data.totalPages && (
                    <Pagination
                        className="flex justify-center w-full mt-4 pb-4"
                        count={data.totalPages}
                        page={page}
                        onChange={(event, value) => setPage(value)}
                    />
                )} */}
            </div>
        </div>
    );
}

export default Search;
