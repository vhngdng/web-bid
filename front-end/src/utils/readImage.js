import { DOMAIN_URL } from '~/CONST/const';

const readImage = (id) => {
    return id.inclues('google') ? id : `${DOMAIN_URL}api/v1/images/read/${id}`;
};

export default readImage;
