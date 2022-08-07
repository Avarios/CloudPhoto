import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';

export class Authentication {
    private userPool:CognitoUserPool;
    constructor() {
        this.userPool = new CognitoUserPool({
            ClientId:'3pbdc4lkloegqs11mnuie9fpk9',
            UserPoolId:'eu-central-1_slvDmPOEs'
        });
    }
}