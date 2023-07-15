import { error, redirect } from '@sveltejs/kit';
import { PUBLIC_CALLBACKURL, PUBLIC_COGNITO_CLIENTID, PUBLIC_COGNITO_URL, PUBLIC_COOKIE_NAME } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies, url, fetch }) => {
    //See https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html for AWS Cognito flow
    const code = url.searchParams.get("code");
    if (!code) {
        throw error(400, "No code provided");
    }
    console.log("received code : " + code);

    const urlParams = {
        "grant_type": "authorization_code",
        "client_id": PUBLIC_COGNITO_CLIENTID,
        "redirect_uri": `${url.origin}${PUBLIC_CALLBACKURL}`,
        "code": code
    }
    const tokenResponse = await fetch(`${PUBLIC_COGNITO_URL}/oauth2/token`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: Object.entries(urlParams).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&'),
        method: "POST"
    });

    if (tokenResponse.status != 200) {
        console.log(tokenResponse.status);
        console.log(tokenResponse.statusText);
        console.log(await tokenResponse.text());
        throw redirect(302, '/error');
    }

    const tokenResult = await tokenResponse.json();
    console.debug(tokenResult);
    const userInfoResponse = await fetch(`${PUBLIC_COGNITO_URL}/oauth2/userInfo`, {
        headers: { "Authorization": `Bearer ${tokenResult.access_token}` }
    });
    const userInfoResult = await userInfoResponse.json();
    console.debug(userInfoResult);
    if (userInfoResult.email_verified !== 'true') {
        console.debug('email not verified');
        cookies.delete(PUBLIC_COOKIE_NAME);
        throw redirect(302, '/authentication/notverified');
    }
    const cookieObject = { ...userInfoResult, "token": tokenResult.id_token }
    cookies.set(PUBLIC_COOKIE_NAME, JSON.stringify(cookieObject), { path: '/', maxAge: tokenResult.expires_in });
    console.debug("redirecting to /")
    throw redirect(302, '/');
}) satisfies PageServerLoad;