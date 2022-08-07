import { Construct } from 'constructs';
import { CfnOutput, Duration, Stack } from 'aws-cdk-lib';
import { AccountRecovery, Mfa, UserPool, UserPoolClient,UserPoolDomain } from 'aws-cdk-lib/aws-cognito';

export class Cognito extends Construct {
    constructor(parent: Stack) {
        super(parent, 'CloudPhotoCognito');


        let userPool = new UserPool(parent, 'CloudPhotoUserPool', {
            accountRecovery: AccountRecovery.PHONE_AND_EMAIL,
            mfa: Mfa.OPTIONAL,
            passwordPolicy: {
                minLength: 8,
                requireSymbols: true,
                requireDigits: true,
                requireLowercase: true,
                requireUppercase: true,
                tempPasswordValidity: Duration.days(1)
            },
            userPoolName:"CloudPhotoUserPool",
            standardAttributes: {
                email: {
                    mutable:false,
                    required:true
                },
                givenName: {
                    mutable:false,
                    required:true
                },
                familyName: {
                    mutable:true,
                    required:true
                }
            },
            mfaSecondFactor: {
                otp:true,
                sms:false
            },
            selfSignUpEnabled:true
        });
        let userPoolClient = new UserPoolClient(parent,'CloudPhotoUserPoolClient',{
            userPool:userPool,
            authFlows: {userPassword:true}  
        });
        let userPoolDomain = new UserPoolDomain(parent,'CloudPhotoUserPoolDomain', {
            userPool,
            cognitoDomain: {
                domainPrefix:'cloudphoto'
            }
        });
        let signInUrl = userPoolDomain.signInUrl(userPoolClient,{
            redirectUri:'http://localhost:5173'
        })

        new CfnOutput(parent,'CloudPhotoClientId',{
            value: userPoolClient.userPoolClientId,
            description: 'The client ID for the WebApp/MobileApp',
        });

        new CfnOutput(parent,'CloudPhotoClientSigninUrl',{
            value: signInUrl,
            description: 'The signinUrl for Cognmito',
        });

        new CfnOutput(parent,'CloudPhotoClientUserPoolID',{
            value: userPool.userPoolId,
            description: 'The user pool id',
        });
        
    }
}