/* eslint-disable no-unused-vars */
import React from 'react';
import { createButton } from 'react-social-login-buttons';

const config = {
    text: 'Log in with Google',
    icon: 'google',
    iconFormat: (name) => `fa fa-${name}`,
    style: { background: '#3b5998' },
    activeStyle: { background: '#293e69' },
};
/** My Facebook login button. */
const MyGoogleLoginButton = createButton(config);

export default MyGoogleLoginButton;
