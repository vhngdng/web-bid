const rowVariant = {
    hidden: { opacity: 0 },
    show: {
        transition: {
            staggerChildren: 0.1,
        },
        opacity: 1,
    },
    close: { opacity: 0 },
};

const transition = { duration: 1, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] };
const colVariant = {
    hidden: { opacity: 0, x: 20, transition },
    show: { opacity: 1, x: 0, transition },
    close: {
        opacity: 0,
        x: -20,
        transition,
    },
};
export { rowVariant, colVariant };
