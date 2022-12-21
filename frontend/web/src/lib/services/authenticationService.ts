import { Authentication } from 'auth0-js';


export class AuthenticationService {
   
    private auth: Authentication;

    constructor() {
        this.auth = new Authentication({
            clientID: 'wDKuvSljcO1BNdet61YYHWSSMxXEXqv3',
            domain: 'cloudphoto.eu.auth0.com'
        })
    }
}