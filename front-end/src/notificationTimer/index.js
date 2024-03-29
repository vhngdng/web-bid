import React from 'react';
import Countdown from 'react-countdown';
import classNames from 'classnames/bind';
import styles from './NotificationTimer.module.scss';

const cx = classNames.bind(styles);
function NotificationTimer({ timer, message }) {
    const targetDate = timer + 5 * 1000;
    const onComplete = () => {
        console.log('Countdown completed!');
    };
    return (
        <Countdown
            date={targetDate}
            onComplete={onComplete}
            renderer={({ seconds, completed }) => {
                if (completed) {
                    // Render whatever you want when the countdown is completed
                    return (
                        <h2 className={cx('noti-success-timer')}>{message}</h2>
                    );
                } else {
                    // Render the countdown timer with minutes and seconds
                    return (
                        <span className={cx('noti-timer')}>
                            {message} in {seconds}
                        </span>
                    );
                }
            }}
        />
    );
}

export default NotificationTimer;
