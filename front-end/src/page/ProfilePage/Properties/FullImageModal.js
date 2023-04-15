import React, { useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { customStyles } from '~/utils/customModalStyle';

Modal.setAppElement('#root');
function FullImageModal() {
    const { imageId } = useParams();
    const [open, setOpen] = useState(true);
    const closeModal = () => {
        setOpen(false);
    };
    console.log('imageId', imageId);
    return (
        <Modal
            isOpen={open}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Property"
        >
            FullImageModal
        </Modal>
    );
}

export default FullImageModal;
