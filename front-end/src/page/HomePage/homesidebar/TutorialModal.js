import React from 'react';
import Modal from 'react-modal';
import Xarrow from 'react-xarrows';
import { customStyles } from '~/utils/customStyle';

function TutorialModal({ isOpen, setIsOpen }) {
    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            style={customStyles}
        >
            <div className="space-x-10 bg-gray-700/20 w-96 h-96">
                <div className="relative flex justify-between h-full">
                    <div id="B" className="absolute top-0 left-1/2">
                        Bid
                    </div>
                    <div id="C" className="absolute top-1/3 right-1/3">
                        Sell
                    </div>
                    <div id="A" className="absolute top-1/3 left-1/3">
                        Buy
                    </div>
                </div>

                <Xarrow start="B" end="A" headSize={4} />
                <Xarrow
                    start="B"
                    end="C"
                    headSize={4}
                    color="rgb(226, 181, 244)"
                    curveness={0.8}
                    strokeWidth={2}
                />
            </div>
        </Modal>
    );
}

export default TutorialModal;
