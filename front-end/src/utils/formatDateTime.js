import { format, parseISO } from 'date-fns';

const formatDateTime = (time) => {
    return {
        date: format(parseISO(time), 'yyyy-MM-dd hh:mm:ss a'),
    };
};

export default formatDateTime;
