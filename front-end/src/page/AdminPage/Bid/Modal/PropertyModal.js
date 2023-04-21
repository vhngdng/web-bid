import { Button, Card, Option, Select } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useGetAllPropertyNotBidQuery } from '~/app/service/property.service';
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

function PropertyModal({ appElement, open, setOpen, setProperty }) {
    const { data, isLoading, isSuccess, refetch } =
        useGetAllPropertyNotBidQuery();
    const [selectProperty, setSelectProperty] = useState('');

    useEffect(() => {
        refetch();
    }, [data]);
    if (isLoading) return <Loader />;

    const handleClose = () => {
        setProperty({});
        closeModal();
    };

    const closeModal = () => {
        setOpen(!open);
    };
    const handleConfirm = () => {
        // console.log(idProperty);
        setProperty(selectProperty);
        setOpen(!open);
    };
    console.log('propertyList', data);
    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Property"
            appElement={appElement}
        >
            <h2>Property name</h2>
            <Card className="flex flex-col w-72 gap-6">
                <Select onChange={(e) => setSelectProperty(e)}>
                    {isSuccess &&
                        data.map((prop, index) => (
                            <Option key={index} value={prop} className="">
                                <p className="italic text-gray-500">
                                    Property Id: {prop.id}
                                </p>
                                <p>{prop.name}</p>
                            </Option>
                        ))}
                </Select>
                <Button onClick={() => handleConfirm()}>Confirm</Button>
                <Button onClick={() => handleClose()}>Cancel</Button>
            </Card>
        </Modal>
    );
}

export default PropertyModal;
