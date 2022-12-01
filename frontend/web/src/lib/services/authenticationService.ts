import { redirect } from "@sveltejs/kit";

export class Authentication {
    private clientId = '7tlnoq7vu7vgct6vqvg5hksod0';

    /* registerUser = (email: string, givenName: string,
          familyName: string, password: string,onSuccess: () => void,onFailure: (err:string) => string) => {
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
         this.userPool.signUp(email, password, attributeList, [], (err: Error | undefined, result: ISignUpResult | undefined) => {
             if (err) {
                 onFailure(err.message);
             }
             if (!result?.user) {
                 onFailure('GENERAL_ERROR')
             }
             onSuccess();
         })
     } */

    /* loginUser = (email: string, password: string, onSuccess: (user:CognitoUser) => CognitoUser, onFailure: (errCode:string) => string) => {
         const user = new CognitoUser({ Pool: this.userPool, Username: email });
         const authenticationDetails = new AuthenticationDetails({ Username: email, Password: password });
 
         user.authenticateUser(authenticationDetails, {
             onSuccess: async (result: CognitoUserSession) => {
                 if (result.isValid()) {
                     onSuccess(user);
                 } else {
                     onFailure('INVALID_CREDENTIALS');
                 }
 
             },
 
             onFailure: (err) => {
                 onFailure(err);
             },
         });
         this.userStore(user)
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
     } */

    loginFederated =  async (provider: string) => {
        console.log(provider);
        const url = `https://scarecrow2.auth.eu-west-1.amazoncognito.com/oauth2/authorize?` +
        `response_type=code&client_id=${this.clientId}&redirect_uri=http://localhost:5173/login/callback&` +
        `scope=openid+profile&identity_provider=${provider}`;
        console.log(url)
        const result = await fetch(url, {
            mode:'no-cors'
        });
        console.log(result);
        const location = result.headers.get('Location');
        if(location) {
            redirect(302, location)
        }
    }
}