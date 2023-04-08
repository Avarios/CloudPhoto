# Welcome to your CDK TypeScript Construct Library project

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests

cdk deploy 
--parameters googleClientId=YOURCLIENTIDFROMGOOGLE
--parameters googleClientSecret=THEClientSecrer 
--parameters cognitoDomain=CognitoDomainName 
--parameters cognitoSenderMail=contactemail 
--parameters redirectUri=http://localhost:4200/authentication/callback
