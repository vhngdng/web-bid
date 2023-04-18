import React from 'react';
// import images from '../images';
// import { motion, motionValue } from 'framer-motion';
function FooterDefault() {
    // eslint-disable-next-line no-unused-vars
    // const [width, setWidth] = useState(0);
    // const container = useRef();
    // const x = motionValue(0);
    // useEffect(() => {
    //     console.log(container.current.scrollWidth);
    //     setWidth(container.current.scrollWidth - container.current.offsetWidth);
    // }, []);
    // const animation = {
    //     initial: {
    //         x: { x },
    //     },
    //     animate: {
    //         x: -width,
    //         transition: {
    //             ease: 'linear',
    //             x: { duration: 20 },
    //             repeat: Infinity,
    //             repeatDelay: 1,
    //         },
    //     },
    // };
    return (
        <>
            <footer className=" bg-neutral-200 text-center text-white dark:bg-neutral-600 dark:text-neutral-200 w-full">
                {/* <motion.div
                    ref={container}
                    className="cursor-grabbing flex overflow-hidden container p-6"
                >
                    <motion.div
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex"
                        initial={animation.initial}
                        animate={animation.animate}
                        transition={animation.animate.transition}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={index}
                                className="px-40 min-h-fit min-w-fit"
                            >
                                <img
                                    src={image}
                                    className="object-cover h-36 w-48 rounded-md shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div> */}

                <div className="bg-neutral-300 p-4 text-center text-black text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                    © 2023 Copyright:&nbsp;
                    <a className="dark:text-neutral-400 " href="#">
                        vhngdng@gmail.com
                    </a>
                </div>
            </footer>
        </>
    );
}

export default FooterDefault;
