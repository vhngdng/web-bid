/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import {
    useLoginGoogleMutation,
    useLoginMutation,
} from '~/app/service/auth.service';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoogleLoginButton } from 'react-social-login-buttons';
import MyGoogleLoginButton from './Button/GoogleButton';
import { GOOGLE_AUTH_URL } from '~/CONST/const';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const cx = classNames.bind(styles);
function Login() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [loginGoogle] = useLoginGoogleMutation();
    const { auth } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const actionGoogleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            console.log(codeResponse);
            loginGoogle(codeResponse.access_token);
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password })
            .unwrap()
            .then(() => {
                alert('Login thành công');
            })
            .catch((err) => console.log(err));
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    if (isAuthenticated) {
        return <Navigate to={'/'} />;
    }

    const handleSocialLoginSuccess = async (credentialResponse) => {
        console.log(credentialResponse.clientId);
        try {
            loginGoogle(credentialResponse.credential);
            navigate('/');
        } catch {
            (err) => console.log(err);
            navigate('/login');
        }
    };
    return (
        <center className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className={cx('login-page')}>
                <div className={cx('form')}>
                    <form className={cx('register-form')}>
                        <input
                            type="text"
                            placeholder="email"
                            autoComplete="email"
                        />
                        <input
                            type="password"
                            placeholder="password"
                            autoComplete="current-password"
                        />
                        <input type="text" placeholder="email address" />
                        <button>create</button>
                        <p className={cx('message')}>
                            Already registered? <a href="#">Sign In</a>
                        </p>
                    </form>
                    <form className={cx('login-form')} onSubmit={handleLogin}>
                        <input
                            autoFocus
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            autoComplete="email"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            autoComplete="current-password"
                        />
                        <input type="submit" value="Login" />
                        <p className={cx('message')}>
                            Not registered? <a href="#">Create an account</a>
                        </p>
                    </form>
                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <GoogleLogin
                            onSuccess={handleSocialLoginSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </div>
                </div>
            </div>
        </center>
    );
}

export default Login;
