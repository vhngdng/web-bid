import React from 'react';
import Loader from '~/Loader';
import { useGetHomeDetailsQuery } from '~/app/service/bid.service';

function MainPage() {
    const { data, isLoading } = useGetHomeDetailsQuery();
    const [search, setSearch] = useState('');
    if (isLoading) return <Loader />;
    console.log(data);
    return (
        <div className="w-3/4 h-screen bg-gray-200/10">
            <div className="h-full border-l-1 border-r-1 shadow-lg">
                <div className="max-w-md mx-auto py-2">
                    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>

                        <input
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder="Search something.."
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default MainPage;
