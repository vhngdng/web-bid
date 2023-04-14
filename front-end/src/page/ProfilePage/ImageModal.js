import { Button, Card } from '@material-tailwind/react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import {
    useGetAllImagesNotPropertyQuery,
    useUpdateTypeImageMutation,
    useUploadImageMutation,
} from '~/app/service/image.service';
import { DOMAIN_URL } from '~/CONST/const';
import Loader from '~/Loader';
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

function ImageModal({
    appElement,
    open,
    setOpen,
    setImage,
    isAvatar,
    selectImage,
}) {
    // eslint-disable-next-line no-unused-vars
    const { isLoading } = useGetAllImagesNotPropertyQuery();
    const [updateTypeImage] = useUpdateTypeImageMutation();
    const images = useSelector((state) => {
        return state.image;
    });

    // eslint-disable-next-line no-unused-vars
    const [uploadImage] = useUploadImageMutation();
    const [selectImageId, setSelectImageId] = useState(selectImage);

    if (isLoading) return <Loader />;
    const handleClose = () => {
        closeModal();
    };

    const closeModal = () => {
        setOpen(!open);
    };
    const handleConfirm = () => {
        // console.log(idProperty);
        setImage(selectImageId);
        updateTypeImage({
            id: selectImageId,
            type: isAvatar ? 'AVATAR' : 'BACKGROUND',
        });
        setOpen(!open);
    };
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        try {
            await uploadImage(formData);
        } catch (error) {
            console.log(error);
        }
    };
    // eslint-disable-next-line no-unused-vars
    const handleSelectImage = (id) => {
        setSelectImageId(id);
    };

    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Property"
            appElement={appElement}
        >
            <h2>{isAvatar ? 'Avatar' : 'Background'}</h2>
            <div className="w-96">
                <Card className="min-w-full md:min-w-0 min-h-full">
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4">
                            {images &&
                                images.length > 0 &&
                                images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-center gap-4 h-24 rounded bg-gray-50 dark:bg-gray-800 ${
                                            selectImageId === image.id
                                                ? 'border-4 border-blue-500/50'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleSelectImage(image.id)
                                        }
                                        title={image.name}
                                    >
                                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                                            <img
                                                alt="Photo avatar"
                                                src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
                                                className="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1"
                                            />
                                        </p>
                                    </div>
                                ))}
                            <label
                                className="flex items-center justify-center gap-4 h-24 rounded bg-gray-50 dark:bg-gray-800 text-2xl text-gray-400 dark:text-gray-500"
                                form="file_input"
                                htmlFor="image"
                            >
                                +
                            </label>
                            <input
                                className="text-2xl text-gray-400 dark:text-gray-500 hidden"
                                id="image"
                                type="file"
                                onChange={(e) => handleUploadImage(e)}
                            />
                        </div>
                    </div>
                    <Button onClick={() => handleConfirm()}>Confirm</Button>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                </Card>
            </div>
        </Modal>
    );
}

export default ImageModal;
