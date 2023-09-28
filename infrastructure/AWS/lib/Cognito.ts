import { Construct } from 'constructs';
import { CfnOutput, CfnParameter, Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import {
    AccountRecovery, Mfa, OAuthScope, ProviderAttribute, UserPool,
    UserPoolClient,
    UserPoolClientIdentityProvider,
    UserPoolEmail, UserPoolIdentityProviderGoogle, VerificationEmailStyle
} from 'aws-cdk-lib/aws-cognito';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
export class Cognito extends Construct {
    constructor(parent: Stack) {
        super(parent, 'CloudPhotoCognito');
        const googleClientId = new CfnParameter(parent, 'googleClientId', {
            type: "String",
            description: "Enter the Google Client Id for the Cognito Connection"
        }).valueAsString;

        const googleClientSecret = new CfnParameter(parent, 'googleClientSecret', {
            type: "String",
            description: "Enter the Google Client Secret for the Cognito Connection"
        }).valueAsString;

        const cognitoDomain = new CfnParameter(parent, 'cognitoDomain', {
            type: "String",
            description: "Domain Prefix for Cognito"
        }).valueAsString;

        const cognitoSenderMail = new CfnParameter(parent, 'cognitoSenderMail', {
            type: "String",
            description: "The Sendermail for Cognito for Password Reset etc."
        }).valueAsString;

        const redirectUri = new CfnParameter(parent, 'redirectUri', {
            type: "String",
            description: "Specify the URL to your callback in the webapp"
        }).valueAsString;

        const useClientSecret = new CfnParameter(parent, 'useClientSecret', {
            type: "String",
            description: "Specify the URL to your callback in the webapp"
        }).valueAsString;

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
            email: UserPoolEmail.withCognito(cognitoSenderMail),
            selfSignUpEnabled: true,
            userVerification: {
                emailSubject: 'Verify your email for CloudPhoto !',
                emailBody: 'Thanks for signing up to CloudPhoto! Your verification code is {####}',
                emailStyle: VerificationEmailStyle.CODE
            },
            signInAliases: {
                email: true
            },
            userPoolName: "CloudPhotoUserPool",
            standardAttributes: {
                email: {
                    mutable: true,
                    required: true
                }
            },
            mfaSecondFactor: {
                otp: true,
                sms: false
            },
            removalPolicy: RemovalPolicy.DESTROY
        });

        const googleProvider = new UserPoolIdentityProviderGoogle(parent, 'googleProvider', {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            userPool,
            scopes: [
                "openid", "email", "profile"
            ],
            attributeMapping: {
                email: ProviderAttribute.GOOGLE_EMAIL,
                givenName: ProviderAttribute.GOOGLE_GIVEN_NAME,
                profilePicture: ProviderAttribute.GOOGLE_PICTURE,
                familyName: ProviderAttribute.GOOGLE_FAMILY_NAME,
                preferredUsername: ProviderAttribute.GOOGLE_NAME
            }
        });
        googleProvider.applyRemovalPolicy(RemovalPolicy.DESTROY);
        userPool.identityProviders.push(googleProvider);

        const appClient = new UserPoolClient(parent, 'webClientCloudPhoto', {
            userPool: userPool,
            accessTokenValidity: Duration.days(1),
            idTokenValidity: Duration.days(1),
            generateSecret: useClientSecret === 'true',
            refreshTokenValidity: Duration.days(1),
            oAuth: {
                callbackUrls: [
                    redirectUri
                ],
                logoutUrls: [
                    redirectUri],
                flows: {
                    authorizationCodeGrant: true
                },
                scopes: [OAuthScope.EMAIL, OAuthScope.OPENID, OAuthScope.PROFILE, OAuthScope.COGNITO_ADMIN]
            },
            supportedIdentityProviders: [
                UserPoolClientIdentityProvider.GOOGLE,
                UserPoolClientIdentityProvider.COGNITO
            ]
        });


        appClient.applyRemovalPolicy(RemovalPolicy.DESTROY);
        appClient.node.addDependency(googleProvider);

        userPool.applyRemovalPolicy(RemovalPolicy.DESTROY);
        const userPoolDomain = userPool.addDomain('CloudPhotoUserPoolDomain', {
            cognitoDomain: {
                domainPrefix: cognitoDomain,
            }
        });

        userPoolDomain.applyRemovalPolicy(RemovalPolicy.DESTROY);
        userPoolDomain.signInUrl(appClient, { redirectUri: redirectUri })


        if (useClientSecret === 'true') {
            new CfnOutput(this, 'UserPoolClientSecret', {
                value: appClient.userPoolClientSecret.unsafeUnwrap(),
            })
        }


        new CfnOutput(parent, 'CloudPhotoClientUserPoolID', {
            value: userPool.userPoolId,
            description: 'The user pool id',
        });

        new CfnOutput(parent, 'CloudPhotoCognitoUrl', {
            value: `${userPoolDomain.domainName}.auth.${parent.region}.amazoncognito.com/oauth2/authorize?client_id=${appClient.userPoolClientId}&response_type=code&scope=email+openid+profile&redirect_uri=${redirectUri}`,
            description: 'Domain Name Congito',
        });

        new CfnOutput(parent, 'CloudPhotoOauthDomain', {
            value: `${userPoolDomain.domainName}`,
            description: 'Domain Name Congito',
        });

        new CfnOutput(parent, 'ClientId', {
            value: appClient.userPoolClientId,
            description: 'Domain Name Congito',
        });


    }
}