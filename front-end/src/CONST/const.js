export const API_BASE_URL = 'http://localhost:8080/api/v1';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000';

export const GOOGLE_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorize/google?redirect_uri=' +
    OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorize/facebook?redirect_uri=' +
    OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
    API_BASE_URL +
    '/oauth2/authorize/github?redirect_uri=' +
    OAUTH2_REDIRECT_URI;
export const AUTHPUBLIC = 'authBlog';

export const DOMAIN_URL = 'https://auctionforfun.site:443/';
export const DOMAIN_BACKEND_WWS = 'https://auctionforfun.site:443/';
