/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import { DOMAIN_URL } from '~/CONST/const';
import {
    useDeleteImageMutation,
    useUpdateTypeImageMutation,
    useUploadImageMutation,
} from '~/app/service/image.service';
import { imageDefault } from '~/assets/images';

const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '50%',
    },
};

function UpdatePropertyDetailModal({
    property,
    open,
    appElement,
    setOpen,
    refetch,
}) {
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [imageId, setImageId] = useState(null);
    const [uploadImage] = useUploadImageMutation();
    const [deleteImage] = useDeleteImageMutation();
    const [updateTypeImage] = useUpdateTypeImageMutation();

    useEffect(() => {
        if (property) {
            setName(property.name);
            setCategory(property.category);
            // if (property.imageId) setImageId(property.imageId);
        } else {
            closeModal();
        }
    }, [property]);

    // console.log(property);
    const closeModal = () => {
        setOpen(false);
    };

    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            const data = await uploadImage(formData).unwrap();
            setImageId(data.id);
            if (!!data.error) {
                console.log(data.error);
                toast.error(`${data.error.data.message}`, {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            }
        } catch (error) {
            console.log(error);
        }
        console.log(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateTypeImage({
            id: imageId,
            propertyId: property.id,
            type: 'PROPERTY',
        }).unwrap();
        refetch();
        setOpen(!open);
    };
    const handleClose = (imageId) => {
        console.log(imageId);
        if (imageId) {
            deleteImage(imageId);
            setImageId(null);
        }
        closeModal();
    };
    console.log(imageId);
    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Property"
            appElement={appElement}
        >
            <h2>Update Property</h2>
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
                        className=" bg-gray-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="name"
                        defaultValue={name}
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
                        defaultValue={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="flex justify-center pt-5 mb-6">
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 blue:text-white"
                        form="file_input"
                        htmlFor="image"
                    >
                        <div className="text-center flex-block justify-center ">
                            UpdateImage
                            <img
                                className="object-fill text-center h-48 w-48"
                                src={
                                    // eslint-disable-next-line no-extra-boolean-cast
                                    !!imageId
                                        ? `${DOMAIN_URL}api/v1/images/read/${imageId}`
                                        : `${imageDefault.logo.default}`
                                }
                                alt="IMG"
                            />
                        </div>
                    </label>
                    <input
                        className="block w-3/5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden"
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
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => handleClose(imageId)}
                >
                    Cancel
                </button>
            </form>
            <ToastContainer pauseOnFocusLoss={false} />
        </Modal>
    );
}

export default UpdatePropertyDetailModal;
