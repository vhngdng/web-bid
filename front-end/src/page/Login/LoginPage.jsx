/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useLoginMutation } from '~/app/service/auth.service';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);
function Login() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { auth } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email);

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

    return (
        <center className={cx('login-body-page')}>
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
                </div>
            </div>
        </center>
    );
}

export default Login;
