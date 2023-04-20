/* eslint-disable no-extra-boolean-cast */
import { Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Loader from '~/Loader';
import { useGetListPropertyForGuestQuery } from '~/app/service/property.service';
import Property from '../components/Property';

function ListProperty() {
    // eslint-disable-next-line no-unused-vars
    const [url, setUrl] = useState(null);
    const [page, setPage] = useState(1);
    const [properties, setProperties] = useState([]);
    const { data, isLoading } = useGetListPropertyForGuestQuery(url);

    useEffect(() => {
        if (!!data && data.content.length > 0) {
            setProperties([...data.content]);
        }
    }, [data]);

    useEffect(() => {
        page > 1 ? setUrl(`page=${page - 1}`) : setUrl(null);
    }, [page]);
    if (isLoading) return <Loader />;

    return (
        <div className="w-full flex justify-start">
            <div className="flex justify-center w-full min-h-75vh">
                <div className="flex flex-col justify-center w-2/3 min-h-full">
                    <div>
                        <div className="w-full my-10">
                            <div className="flex justify-end mr-10 ">
                                <div className="bg-gray-400/50 w-fit">
                                    {' '}
                                    Sort by
                                </div>
                            </div>
                        </div>
                        <div className="h-full flex flex-wrap justify-around ">
                            {properties.map((property, index) => (
                                <Property key={index} property={property} />
                            ))}
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
    );
}

export default ListProperty;
