export const ssr = true;
import { PRIVATE_COGNITO_CLIENTID, PRIVATE_COGNITO_USERPOOLID } from '$lib/server/configuration'
import { Authentication } from '$lib/services';
import { user } from '$lib/store';

console.log(PRIVATE_COGNITO_CLIENTID,PRIVATE_COGNITO_USERPOOLID);
const auth = new Authentication(PRIVATE_COGNITO_CLIENTID,PRIVATE_COGNITO_USERPOOLID, user);
