import { Amplify, Auth } from 'aws-amplify';
import { configuration } from './aws.exports';


Amplify.configure({
    Auth: configuration.Auth,

});

export default Auth; 