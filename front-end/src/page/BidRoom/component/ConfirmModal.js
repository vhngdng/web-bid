import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
// import { customStyles } from '~/utils/customStyle';
const style = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: 'fit',
        borderRadius: '25px',
    },
};
function ConfirmModal({ open, setOpen, url }) {
    const navigate = useNavigate();
    const closeModal = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        closeModal();
        navigate(url);
    };
    return (
        <Modal isOpen={open} onRequestClose={closeModal} style={style}>
            <div className="rounded-lg">
                <div>Do you want to exit this room and redirect?</div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-green-500 rounded-lg"
                        onClick={handleConfirm}
                    >
                        Yes
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 rounded-lg"
                        onClick={closeModal}
                    >
                        No
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ConfirmModal;
