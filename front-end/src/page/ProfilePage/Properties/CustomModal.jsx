/* eslint-disable no-unused-vars */
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
    useUpdateTypeImageMutation,
    useUploadImageMutation,
} from '~/app/service/image.service';

function CustomModal({
    isOpen,
    setIsOpen,
    isDelete,
    setFile,
    file,
    setImages,
}) {
    const { propertyId } = useParams();
    const [uploadImage] = useUploadImageMutation();
    const [updateTypeImage] = useUpdateTypeImageMutation();
    const handleAccept = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const { data } = await uploadImage(formData);
            const res = await updateTypeImage({
                id: data.id,
                propertyId,
            });
            setImages((prev) => [...prev, { id: res.data.id, type: null }]);
        } catch (error) {
            console.log(error);
        }
        setFile(null);
        setIsOpen((prev) => !prev);
    };
    const handleCancel = () => {
        setFile(null);
        setIsOpen((prev) => !prev);
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={setIsOpen}
                    as="div"
                    className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
                >
                    <div className="flex flex-col py-8 px-4 text-center">
                        <Dialog.Overlay />
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <motion.div
                            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
                            initial={{
                                opacity: 0,
                                scale: 0.75,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    ease: 'easeOut',
                                    duration: 0.15,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.75,
                                transition: {
                                    ease: 'easeIn',
                                    duration: 0.15,
                                },
                            }}
                        >
                            <span
                                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>

                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="modal-headline"
                            >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {isDelete && (
                                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg
                                                    className="h-6 w-6 text-red-600"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg leading-6 font-medium text-gray-900"
                                                id="modal-headline"
                                            >
                                                {isDelete
                                                    ? 'Delete Image'
                                                    : 'Upload Image'}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {isDelete ? (
                                                    <Dialog.Description
                                                        as="p"
                                                        className="text-sm text-gray-500"
                                                    >
                                                        Are you sure you want to
                                                        delete your images ? All
                                                        of your data will be
                                                        permanently removed.
                                                        This action cannot be
                                                        undone.
                                                    </Dialog.Description>
                                                ) : (
                                                    <Dialog.Description
                                                        as="p"
                                                        className="text-sm text-gray-500"
                                                    >
                                                        Are you sure you want to
                                                        Upload Image ?
                                                    </Dialog.Description>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        tabIndex={0}
                                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                                            isDelete
                                                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                        } text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm`}
                                        onClick={handleAccept}
                                    >
                                        {isDelete ? 'Delete' : 'Upload'}
                                    </button>
                                    <button
                                        type="button"
                                        tabIndex={0}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}

export default CustomModal;
