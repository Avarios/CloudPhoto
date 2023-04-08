export const configuration = {
    Auth: {
        // (required)- Amazon Cognito Region
        region: 'eu-central-1',
        // (optional) - Amazon Cognito User Pool ID
        userPoolId: 'USERPOOLID',
        // (optional) - Amazon Cognito Web Client ID (26-char alphanumeric string, App client secret needs to be disabled)
        userPoolWebClientId: 'USERPPOOLWEBCLIENT',
        // userPoolWebClientSecret : '',
        // (optional) - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
        // (optional) - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
            // - Cookie domain (only required if cookieStorage is provided)
            domain: '.localhost',
            // (optional) - Cookie path
            path: '/',
            // (optional) - Cookie expiration in days
            expires: 365,
            // (optional) - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            sameSite: 'lax',
            // (optional) - Cookie secure flag
            // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },
        // (optional) - customized storage object
        storage: localStorage,
        // (optional) - Hosted UI configuration
        oauth: {
            domain: 'YOURCOGNITODOMAINURL',
            scope: [
                'email',
                'profile',
                'openid',
                'aws.cognito.signin.user.admin'
            ],
            redirectSignIn: 'http://localhost:4200/authentication/callback',
            redirectSignOut: 'http://localhost:4200/authentication/callback',
            clientId: '1g0nnr4h99a3sd0vfs9',
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
}