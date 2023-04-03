import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './app/store';
import './index.css';
import App from './App';
import GlobalStyles from './component/GlobalStyles';
import { ThemeProvider } from '@material-tailwind/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
// eslint-disable-next-line no-undef
const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
root.render(
    <Provider store={store}>
        <GlobalStyles>
            <ThemeProvider>
                <Router>
                    <GoogleOAuthProvider
                        // eslint-disable-next-line no-undef
                        clientId={GOOGLE_OAUTH_CLIENT_ID}
                    >
                        <App />
                    </GoogleOAuthProvider>
                </Router>
            </ThemeProvider>
        </GlobalStyles>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
