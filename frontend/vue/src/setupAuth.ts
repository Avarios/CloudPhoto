import { Amplify, Hub } from 'aws-amplify';
import { useAuthenicationStore } from './stores/authenication';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Region
        region: import.meta.env.VITE_AWS_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: import.meta.env.VITE_AWS_USERPOOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: import.meta.env.VITE_AWS_USERPOOL_CLIENTID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
            // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: `${window.location.hostname}`,
            // OPTIONAL - Cookie path
            path: '/',
            // OPTIONAL - Cookie expiration in days
            expires: 365,
            // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            sameSite: "lax",
            // OPTIONAL - Cookie secure flag
            // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: true
        },

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_SRP_AUTH',

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: import.meta.env.VITE_AWS_OAUTH_DOMAIN,
            scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: window.location.protocol + '//' + window.location.host,
            redirectSignOut: window.location.protocol + '//' + window.location.host,
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

export class AuthenticatonSetup {
    authStore: any
    listener = (data:any) => {
        switch (data.payload.event) {
            case 'signIn':
                console.log('signin');
                this.authStore.setUser(data);
                break;
            case 'signIn_failure':
                console.error('signin_failure');
                break;
            case 'signUp':
                break;
            case 'signUp_failure':
                break;
            case 'confirmSignUp':
                break;
            case 'completeNewPassword_failure':
                break;
            case 'autoSignIn':
                break;
            case 'autoSignIn_failure':
                break;
            case 'forgotPassword':
                break;
            case 'forgotPassword_failure':
                break;
            case 'forgotPasswordSubmit':
                break;
            case 'forgotPasswordSubmit_failure':
                break;
            case 'verify':
                break;
            case 'cognitoHostedUI':
                console.log('Cognito Hosted UI sign in successful');
                break;
            case 'cognitoHostedUI_failure':
                console.log('Cognito Hosted UI sign in failed');
                break;
            case 'parsingCallbackUrl':
                console.log('Cognito Hosted UI OAuth url parsing initiated');
                break;
            case 'signOut':
                this.authStore.signOut();
                console.log('user signed out');
                break;
        }
    };
    constructor() {
        this.authStore = useAuthenicationStore();
        Hub.listen('auth', this.listener);
        this.authStore.setUser();
    }
}

