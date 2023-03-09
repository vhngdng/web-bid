import React, { useState } from 'react';
import classNames from 'classnames/bind';
// import SimpleMdeReact from 'react-simplemde-editor';
import styles from './BidCreate.module.scss';
const cx = classNames.bind(styles);
function BidCreate() {
    const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    return (
        <>
            <h1>Create Bid Room</h1>
            <form className={cx('create-form')}>
                <div>
                    <label>Property title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Nội dung</label>
                    {/* <SimpleMdeReact
                        value={content}
                        onChange={(value) => setContent(value)}
                    /> */}
                </div>
            </form>
        </>
    );
}

export default BidCreate;
