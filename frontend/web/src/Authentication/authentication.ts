import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, CookieStorage, type ISignUpResult } from 'amazon-cognito-identity-js';
import { COGNITO_CLIENTID, COGNITO_USERPOOLID } from '../configuration';

const STORAGE_USER_KEY = 'user';

export interface CloudPhotoUser {
    email: string,
    firstName: string,
    lastname: string,
    username: string;
}


export class Authentication {
    private static instance: Authentication;
    private cognitoUser: CognitoUser;
    private localStorage: Storage = window.localStorage;
    private user: CloudPhotoUser;
    private userPool: CognitoUserPool;

    private constructor() {
        this.userPool = new CognitoUserPool({
            ClientId: COGNITO_CLIENTID,
            UserPoolId: COGNITO_USERPOOLID,
            Storage: this.localStorage
        })
        const user = this.userPool.getCurrentUser();
        if (user) {
            const storedUser = this.localStorage.getItem(STORAGE_USER_KEY);
            if (storedUser) {
                this.user = JSON.parse(storedUser);
                this.cognitoUser = new CognitoUser({
                    Pool: this.userPool,
                    Username: this.user.username
                });
                this.cognitoUser.getSession((err, sess: CognitoUserSession) => {
                    if (err) {
                        this.user = null;
                        this.cognitoUser = null;
                    } else {
                        if (!sess.isValid()) {
                            this.user = null;
                            this.localStorage.removeItem(STORAGE_USER_KEY)
                        } else {
                            const isValid = sess.isValid();
                            console.log(isValid);
                        }
                    }
                });
            }
        } else {
            this.user = undefined;
            this.cognitoUser = undefined;
        }

    }

    public static get Instance(): Authentication {
        if (!Authentication.instance) {
            Authentication.instance = new Authentication();
        };
        return Authentication.instance;
    }

    registerUser = async (email: string, givenName: string, familyName: string, password: string) => {
        const attributeList: CognitoUserAttribute[] = [
            new CognitoUserAttribute({
                Name: 'email',
                Value: email
            }),
            new CognitoUserAttribute({
                Name: 'given_name',
                Value: givenName
            }),
            new CognitoUserAttribute({
                Name: 'family_name',
                Value: familyName
            })
        ];
        this.userPool.signUp(email, password, attributeList, null, (err: Error, result: ISignUpResult) => {
            if (err) {
                console.log(err.message);
                // SHow error message
                return;
            }
            if (!result.user) {
                // Show error message
                return;
            }

            // Redirect to verify 
        })
    }

    loginUser = (email: string, password: string) => {
        const user = new CognitoUser({ Pool: this.userPool, Username: email });
        const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password });
        user.authenticateUser(authenticationDetails, {
            onSuccess: async (result: CognitoUserSession) => {
                if (result.isValid()) {
                    this.cognitoUser = user;
                    this.user = await this.fetchUserAttributes();
                    this.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(this.user));
                } else {
                    //TODO: Error Handling
                }

            },

            onFailure: (err) => {
                //TODO: Error Handling
                if (err.code == 'UserNotConfirmedException') {
                    // Not confirmed
                } else if (err.code == 'PasswordResetRequiredException') {
                    // Reset Password Required
                } else if (err.code == 'NotAuthorizedException') {
                    // Not Authorised (Incorrect Password)
                } else if (err.code == 'ResourceNotFoundException') {
                    // User Not found
                } else {
                    // Unknown
                }
            },
        });
    }


    verifyUser = (email: string, code: string) => {
        const user = new CognitoUser({ Pool: this.userPool, Username: email });
        user.confirmRegistration(code, false, (err, result) => {
            if (err) {
                console.log(err.message, JSON.stringify(err));
                //TODO: ERROR HANDLING
            }
            if (result == 'SUCCESS') {
                //TODO: SUCCESS
            }
        });
        this.cognitoUser = this.userPool.getCurrentUser();
    }

    logout = () => {
        const user = new CognitoUser({ Pool: this.userPool, Username: this.user.username });
        user.signOut(() => {
            this.user = undefined;
            this.cognitoUser = undefined;
        })

    }

    private fetchUserAttributes = async (): Promise<CloudPhotoUser> => {
        return new Promise((resolve, reject) => {
            this.cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                    reject(err);
                }
                const user: CloudPhotoUser = {
                    email: attributes.find(x => x.Name == 'email').Value,
                    firstName: attributes.find(x => x.Name == 'given_name').Value,
                    lastname: attributes.find(x => x.Name == 'family_name').Value,
                    username: attributes.find(x => x.Name == 'sub').Value
                }

                resolve(user);
            })
        })

    }

    get isAuthenticated(): boolean {
        return !!this.cognitoUser;
    }

    get userInformation(): CloudPhotoUser {
        return this.user;
    }
}