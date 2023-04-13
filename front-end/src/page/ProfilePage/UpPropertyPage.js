/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useUploadImageMutation } from '~/app/service/image.service';
import { useCreatePropertyMutation } from '~/app/service/property.service';

function UpPropertyPage() {
    // eslint-disable-next-line no-unused-vars
    const [uploadImage] = useUploadImageMutation();
    const [createProperty] = useCreatePropertyMutation();
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [showModal, setShowModal] = useState(true);
    // console.log(file);
    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const { data } = await uploadImage(formData);
            const imageId = data.id;
            createProperty({
                name,
                category,
                imageId,
            })
                .unwrap()
                .then(() => {
                    toast.success('Create successfully', {
                        theme: undefined,
                    });
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form className="">
                <div className="mb-6">
                    <label
                        form="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Property Name
                    </label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        form="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Category
                    </label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="flex items-start pt-5 mb-6">
                    <label
                        className="block mb-2 mr-2 text-sm font-medium text-gray-900 blue:text-white"
                        form="file_input"
                        htmlFor="image"
                    >
                        Upload file
                    </label>
                    <input
                        className="block w-3/5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="image"
                        type="file"
                        onChange={(e) => handleFileInputChange(e)}
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </button>
            </form>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default UpPropertyPage;
