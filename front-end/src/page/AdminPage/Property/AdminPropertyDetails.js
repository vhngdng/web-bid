/* eslint-disable no-extra-boolean-cast */
import Modal from 'react-modal';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customToastStyle } from '~/utils/customStyle';
import {
    useGetAdminDetailPropertyQuery,
    useUpdatePropertyMutation,
} from '~/app/service/property.service';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import Loader from '~/Loader';
import { liVariant, sidebar } from '~/animation';
import { imageDefault } from '~/assets';
import { DOMAIN_URL } from '~/CONST/const';
import { ToastContainer, toast } from 'react-toastify';
import { NotificationContext } from '~/context/NotificationProvider';
Modal.setAppElement('#root');

const style = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '70%',
        width: '70%',
        borderRadius: '25px',
        backgroundColor: 'transparent',
    },
};
function AdminPropertyDetails() {
    const { propertyId } = useParams();
    const [updateProperty] = useUpdatePropertyMutation();
    const [isOpen, setIsOpen] = useState(true);
    const [imageAvatar, setImageAvatar] = useState('');
    const { data, isLoading, isSuccess } =
        useGetAdminDetailPropertyQuery(propertyId);
    const [permission, setPermission] = useState();
    const [reservePrice, setReservePrice] = useState();
    const [images, setImages] = useState([]);
    const [auctioneerPrice, setAuctioneerPrice] = useState(0);
    const [isNotAcceptedReservePrice, setIsNotAcceptedReservePrice] =
        useState(false);
    const [width, setWidth] = useState(0);
    const [x, setX] = useState(0);
    const { newNoti } = useContext(NotificationContext);
    const navigate = useNavigate();
    const ref = useRef(null);
    const inputRef = useRef();
    // eslint-disable-next-line no-unused-vars
    const [scope, animate] = useAnimate();

    useEffect(() => {
        console.log(permission);
    }, [permission]);
    useEffect(() => {
        let handler = (e) => {
            if (!inputRef.current.contains(e.target)) {
                setIsNotAcceptedReservePrice(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);

    useEffect(() => {
        if (isSuccess && data.images.some((i) => i.type === 'PROPERTY')) {
            setImageAvatar(data.images.find((i) => i.type === 'PROPERTY').id);
        }
        isSuccess && !!data.property.permission
            ? setPermission(data.property.permission)
            : setPermission('NOTCHECK');

        isSuccess &&
            !!data.property.reservePrice &&
            setAuctioneerPrice(data.property.auctioneerPrice);

        isSuccess && setReservePrice(data.property.reservePrice);

        isSuccess && !!data.images > 0 && setImages([...data.images]);
    }, [data]);
    useEffect(() => {
        if (isSuccess && images.length > 0) {
            setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
        }
    }, [images]);

    useEffect(() => {
        console.log('noti context', newNoti);
        if (
            !!newNoti &&
            newNoti.notification === 'PROPERTY' &&
            newNoti.id === data.property.id
        ) {
            console.log('context run');
            permission !== newNoti.permission &&
                setPermission(newNoti.permission);
            auctioneerPrice !== newNoti.auctioneerPrice &&
                setAuctioneerPrice(newNoti.auctioneerPrice);
            reservePrice !== newNoti.reservePrice &&
                setReservePrice(newNoti.reservePrice);
        }
    }, [newNoti]);

    if (isLoading) return <Loader />;

    function nextStep() {
        images.length > 0 &&
            animate(
                ref.current,
                {
                    x: x - 160 > -width ? [x, x - 160] : [x, -width],
                },
                {
                    duration: 1,
                    repeatType: 'loop',
                    ease: [0.17, 0.37, 0.63, 0.77],
                },
            );
        setX((prev) => (prev - 160 > -width ? x - 160 : -width));
    }

    function prevStep() {
        if (images.length > 0 && x <= 160) {
            animate(
                ref.current,
                {
                    x: [x, x + 160],
                },
                {
                    duration: 1,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                },
            );
            console.log('x', x);
            setX((prev) => prev + 160);
        }
    }

    const closeModal = () => {
        setIsOpen(false);
        navigate('/admin/properties');
    };

    const handleSubmit = async () => {
        try {
            const res = await updateProperty({
                propertyId,
                auctioneerPrice: !!auctioneerPrice
                    ? auctioneerPrice
                    : reservePrice,
                permission,
            });
            console.log('res', res);
            toast.success('Updated successfully', customToastStyle);
            setTimeout(() => {
                navigate('/admin/properties');
            }, 1000);
        } catch {
            (err) => {
                console.log(err);
            };
        }
    };
    const handleCancel = () => {
        setIsOpen(false);
        navigate('/admin/properties');
    };
    console.log(data);
    console.log('new noti console bottom', newNoti);
    const handleAccept = () => {};
    return (
        <AnimatePresence mode="wait" initial="false">
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={style}
                contentLabel="Property"
            >
                <motion.section
                    initial={sidebar.closed}
                    animate={sidebar.open}
                    exit={sidebar.closed}
                    className="text-gray-700 body-font w-full px-10"
                >
                    <div className="px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <div className="lg:w-1/2 relative rounded-lg">
                                <motion.img
                                    initial={{ scale: 0.5 }}
                                    animate={{
                                        rotate: 360,
                                        scale: 1,
                                        transition: { duration: 2 },
                                    }}
                                    alt={
                                        !!data ? data.property.name : 'Property'
                                    }
                                    className=" w-full object-cover object-center rounded-lg shadow-2xl"
                                    src={
                                        !!data && data.images
                                            ? `${DOMAIN_URL}api/v1/images/read/${imageAvatar}`
                                            : `${imageDefault.logo.default}`
                                    }
                                />
                                <div className="relative bg-transparent">
                                    {images.length > 0 && (
                                        <button
                                            className="absolute -left-8 top-1/2"
                                            onClick={prevStep}
                                        >
                                            ◀
                                        </button>
                                    )}
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                        className="w-full"
                                    >
                                        <motion.div className="w-full overflow-x-hidden">
                                            <motion.div
                                                className="flex justify-center items-center my-6 h-40 w-40 rounded-lg"
                                                ref={ref}
                                            >
                                                {images.length > 0 &&
                                                    images.map(
                                                        (image, index) => (
                                                            <motion.img
                                                                key={index}
                                                                src={`${DOMAIN_URL}api/v1/images/read/${image.id}`}
                                                                initial={{
                                                                    x: 300,
                                                                    opacity: 0,
                                                                }}
                                                                animate={{
                                                                    x: 0,
                                                                    opacity: 1,
                                                                }}
                                                                exit={{
                                                                    x: -300,
                                                                    opacity: 0,
                                                                }}
                                                                transition={{
                                                                    type: 'spring',
                                                                    stiffness: 260,
                                                                    damping: 20,
                                                                }}
                                                                className="object-cover h-full w-full px-4 rounded-lg"
                                                            />
                                                        ),
                                                    )}
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                    {images.length > 0 && (
                                        <button
                                            className="absolute bg-transparent -right-8 top-1/2 "
                                            onClick={nextStep}
                                        >
                                            ▶
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <motion.h2
                                    initial={liVariant.closed}
                                    animate={liVariant.open}
                                    exit={liVariant.closed}
                                    className="text-sm title-font text-gray-500 tracking-widest"
                                >
                                    NAME
                                </motion.h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                    #{data.property.id} - {data.property.name}
                                </h1>
                                <div className="flex mb-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-600 ml-3">
                                            {data.property.category}
                                        </span>
                                    </div>
                                    <div className="flex ml-3 pl-3 py-2 border-l-2 text-2xl border-gray-200">
                                        <div className="flex ml-6 items-center">
                                            <div className="relative">
                                                <select
                                                    value={permission}
                                                    onChange={(e) =>
                                                        setPermission(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                                                >
                                                    <option
                                                        className="text-yellow-800"
                                                        value="NOTCHECK"
                                                    >
                                                        NOTCHECK
                                                    </option>
                                                    <option
                                                        className="text-red-700"
                                                        value="REFUSED"
                                                    >
                                                        REFUSE
                                                    </option>
                                                    {!!reservePrice &&
                                                        data.property
                                                            .auctioneerPrice ===
                                                            reservePrice && (
                                                            <option
                                                                className="text-green-700"
                                                                value="ACCEPTED"
                                                            >
                                                                ACCEPT
                                                            </option>
                                                        )}
                                                </select>
                                                <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                    <svg
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <div className="flex justify-center items-center">
                                        <span className="mr-3">
                                            <img
                                                className="object-fit h-8 w-12 rounded-full"
                                                src={
                                                    !!data &&
                                                    data.property.owner.avatar
                                                        ? data.property.owner
                                                              .avatar
                                                        : 'https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'
                                                }
                                            />
                                        </span>
                                        <span className="mr-3">
                                            {data.property.owner.username}
                                        </span>
                                        <a className="mr-3 cursor-pointer">
                                            {data.property.owner.email}
                                        </a>
                                    </div>
                                </div>
                                <p className="leading-relaxed">
                                    {!!data.property.description
                                        ? data.property.description
                                        : 'No description'}
                                </p>
                                {!!data.property.auctioneerPrice && (
                                    <div className="text-gray-400 font-sans ">
                                        (auction price){' '}
                                        {data.property.auctioneerPrice}
                                    </div>
                                )}

                                <div className="" ref={inputRef}>
                                    {isNotAcceptedReservePrice ? (
                                        <div>
                                            <span>$ </span>
                                            <input
                                                className="w-28"
                                                autoFocus
                                                type="text"
                                                defaultValue={auctioneerPrice}
                                                onChange={(e) =>
                                                    setAuctioneerPrice(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <span
                                            onClick={() =>
                                                setIsNotAcceptedReservePrice(
                                                    true,
                                                )
                                            }
                                            className="cursor-pointer title-font font-medium text-2xl text-gray-900"
                                        >
                                            $
                                            {!!reservePrice
                                                ? reservePrice
                                                : 'No price'}
                                        </span>
                                    )}
                                    <div className="font-sans ">
                                        Quantity: {data.property.quantity}
                                    </div>
                                    <div className="flex justify-center items-center space-x-2">
                                        <button
                                            onClick={handleSubmit}
                                            className="h-fit flex ml-auto text-white bg-green-400 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={handleAccept}
                                            className={`h-fit flex ml-auto text-white bg-blue-400 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded 
                                            `}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="h-fit flex ml-auto text-white bg-red-400 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>
                <ToastContainer />
            </Modal>
        </AnimatePresence>
    );
}

export default AdminPropertyDetails;
