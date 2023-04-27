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

const ulVariant = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(30px at 40px 40px)',
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const variantsDirection = {
    initial: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            // scale: 0.5,
        };
    },
    animate: {
        x: 0,
        opacity: 1,
        // scale: 1,
        // transition: 'ease-in',
        transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
        },
    },
    exit: (direction) => {
        return {
            x: direction > 0 ? -1000 : 1000,
            opacity: 0,
            // scale: 0.5,
            // transition: 'ease-in',
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
            },
        };
    },
};

const liVariant = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: 50,
        opacity: 0,
        transition: {
            x: { stiffness: 1000 },
        },
    },
};

const homeSidebarVariants = {
    open: {
        height: '100vh',
    },
    collapsed: { height: '93vh' },
};

const learnMoreVariants = {
    open: {
        opacity: 1,
        x: [500, 0],
        transition: {
            x: { type: 'spring', stiffness: 200, damping: 30, velocity: -100 },
            opacity: { stiffness: 1000 },
            duration: 1,
            ease: [0.17, 0.67, 0.83, 0.67],
        },
    },
    closed: {
        opacity: 0,
        x: [0, -500],
        transition: {
            x: { type: 'spring', stiffness: 200, damping: 30, velocity: -100 },
            opacity: { stiffness: 1000 },
            duration: 1,
            ease: [0.17, 0.67, 0.63, 0.87],
        },
    },
};

const backgroundVariants = {
    open: {
        opacity: [0, 1],
        scale: [0.3, 1],
        transition: {
            scale: {
                stiffness: 50,
            },
            duration: 1,
            ease: [0.17, 0.37, 0.63, 0.97],
        },
    },
    closed: {
        opacity: [1, 0],
        scale: [1, 0.3],
        transition: {
            scale: {
                stiffness: 50,
            },
            duration: 1,
            ease: [0.17, 0.37, 0.63, 0.97],
        },
    },
};

export {
    backgroundVariants,
    learnMoreVariants,
    homeSidebarVariants,
    rowVariant,
    colVariant,
    sidebar,
    ulVariant,
    liVariant,
    variantsDirection,
};
