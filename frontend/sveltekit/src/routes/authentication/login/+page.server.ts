
import type { PageServerLoad } from "./$types"
import {
    PUBLIC_COGNITO_CLIENTID,
    PUBLIC_CALLBACKURL,
    PUBLIC_COGNITO_URL
} from '$env/static/public';

export const load = (async ({ url }) => {

    const googleUrl = `${PUBLIC_COGNITO_URL}/oauth2/authorize?response_type=code&redirect_uri=${url.origin}${PUBLIC_CALLBACKURL}&scope=openid+profile+aws.cognito.signin.user.admin&identity_provider=Google&client_id=${PUBLIC_COGNITO_CLIENTID}`;
    return {
        googleUrl
    }

}) satisfies PageServerLoad; 