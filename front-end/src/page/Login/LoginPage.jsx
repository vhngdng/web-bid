/* eslint-disable no-extra-boolean-cast */
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
import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';
import { eachDayOfInterval } from 'date-fns/esm';
import { Helmet } from 'react-helmet';

const cx = classNames.bind(styles);
function Login() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [loginGoogle] = useLoginGoogleMutation();
    const { auth } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password })
            .unwrap()
            .then((res) => {
                // alert('Login thành công');
                console.log(res);
                toast.success('Login thành công', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                });
            })
            .catch((err) => {
                console.log(err);
                if (err.status === 401) {
                    toast.error('The email or password is not correct', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored',
                    });
                }
            });
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login Auctionforfun</title>
                <meta name="description" content="Login Auctionforfun" />
            </Helmet>
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
                            Not registered?{' '}
                            <Link to="/sign-up">Create an account</Link>
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
            <ToastContainer />
        </center>
    );
}

export default Login;
