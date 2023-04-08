
const authenticationConfiguration = {
        region: import.meta.env.VITE_AWS_REGION,
        userPoolId: import.meta.env.VITE_COGNITO_USERPOOL_ID,
        userPoolWebClientId: import.meta.env.VITE_COGNITO_WEBCLIENT_ID,
        storage: localStorage,
        oauth: {
            domain: import.meta.env.VITE_COGNITO_DOMAIN,
            scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: import.meta.env.VITE_OAUTH_REDIRECT_SIGNIN,
            redirectSignOut: import.meta.env.VITE_OAUTH_REDIRECT_SIGNOUT,
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
}

export { authenticationConfiguration }