import React, { useState } from 'react';
import Modal from 'react-modal';
import Xarrow from 'react-xarrows';
// import { customStyles } from '~/utils/customStyle';
// import backgroundImage from '~/assets/images/bg-tutorialv2.png';
function Tutorial() {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <button onClick={() => setIsOpen((prev) => !prev)}>Tutorial</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={{
                    top: '40%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    height: '70%',
                    width: '70%',
                }}
            >
                <div className="space-x-10 h-full bg-gray-700/20">
                    <div className="relative flex justify-between h-full">
                        <div id="A" className="absolute top-0 left-0">
                            Test
                        </div>

                        <div id="C" className="absolute top-0 right-0">
                            Test3
                        </div>
                        <div id="B" className="absolute top-1/2 left-1/2">
                            Test2
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
        </>
    );
}

export default Tutorial;
