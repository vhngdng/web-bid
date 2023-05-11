import { format } from 'date-fns';

const formatDateTime = (time) => {
    console.log(time);
    return {
        date: format(new Date(...time), 'yyyy-MM-dd hh:mm:ss a'),
    };
};

export default formatDateTime;
