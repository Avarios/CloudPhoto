import { Construct } from 'constructs';
import { CfnOutput, Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { AccountRecovery, Mfa, UserPool, UserPoolClient,UserPoolDomain, UserPoolEmail, UserPoolIdentityProvider, UserPoolIdentityProviderGoogle, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';

export class Cognito extends Construct {
    constructor(parent: Stack) {
        super(parent, 'CloudPhotoCognito');


        const userPool = new UserPool(parent, 'CloudPhotoUserPool', {
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            mfa: Mfa.OPTIONAL,
            passwordPolicy: {
                minLength: 8,
                requireSymbols: true,
                requireDigits: true,
                requireLowercase: true,
                requireUppercase: true,
                tempPasswordValidity: Duration.days(1)
            },
            email:UserPoolEmail.withCognito('admin@cloudphoto.com'),
            selfSignUpEnabled: true,
            userVerification: {
              emailSubject: 'Verify your email for CloudPhoto !',
              emailBody: 'Thanks for signing up to CloudPhoto! Your verification code is {####}',
              emailStyle: VerificationEmailStyle.CODE
            },
            signInAliases: {
                email:true
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
            removalPolicy:RemovalPolicy.DESTROY
        });

        const googleProvider = new UserPoolIdentityProviderGoogle(parent,'googleProvider', {
            clientId:'11311442041-24bb1so41t7en3eo0etjofq2ibph7v6v.apps.googleusercontent.com',
            clientSecret:'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',
            userPool,
            scopes: [
                "openid","email", "name"
            ]
        });

        googleProvider.applyRemovalPolicy(RemovalPolicy.DESTROY);

        const userPoolClient = new UserPoolClient(parent,'CloudPhotoUserPoolClient',{
            userPool:userPool,
            authFlows: {userPassword:true, userSrp:true}  
        });
        const userPoolDomain = new UserPoolDomain(parent,'CloudPhotoUserPoolDomain', {
            userPool,
            cognitoDomain: {
                domainPrefix:'cloudphoto'
            }
        });
        const signInUrl = userPoolDomain.signInUrl(userPoolClient,{
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

        new CfnOutput(parent,'CloudPhotoCognitoUrl',{
            value: userPoolDomain.domainName,
            description: 'Domain Name Congito',
        });
        
    }
}