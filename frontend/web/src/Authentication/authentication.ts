import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    type ISignUpResult
} from 'amazon-cognito-identity-js';

export class Authentication {
    private userPool:CognitoUserPool;
    private user:CognitoUser;

    constructor() {
        this.userPool = new CognitoUserPool({
            ClientId:'3pbdc4lkloegqs11mnuie9fpk9',
            UserPoolId:'eu-central-1_slvDmPOEs'
        });     
    }

    registerUser = (email:string,givenName:string,familyName:string,password:string) => {
        let attributeList:CognitoUserAttribute[] = [
            new CognitoUserAttribute({
                Name:'email',
                Value:email
            }),
            new CognitoUserAttribute({
                Name:'givenName',
                Value:givenName
            }),
            new CognitoUserAttribute({
                Name:'familyName',
                Value:familyName
            })
        ];
        this.userPool.signUp(email,password,attributeList,null,(err:Error,result:ISignUpResult) => {
            if(err) {
                console.log(err.message);
            }
            this.user = result.user;
            console.log(result.userSub);
        })
    }

    get currentUser ():CognitoUser {
        return this.user || this.userPool.getCurrentUser();
    }
}