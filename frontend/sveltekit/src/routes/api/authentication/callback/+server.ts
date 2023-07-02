import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { PUBLIC_CALLBACKURL, PUBLIC_COGNITO_CLIENTID, PUBLIC_COGNITO_URL, PUBLIC_USERCOOKIE_NAME } from '$env/static/public';

export const GET = (async ({ url, fetch, cookies }) => {
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
    const formBody = Object.entries(urlParams).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')
    console.log("formBody : " + formBody);
    const tokenResponse = await fetch(`${PUBLIC_COGNITO_URL}/oauth2/token`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
        method: "POST"
    });

    if (tokenResponse.status != 200) {
        console.log(tokenResponse.status);
        console.log(tokenResponse.statusText);
        console.log(await tokenResponse.text());
        throw redirect(302,'/error');
    }

    const tokenResult = await tokenResponse.json();
    console.debug(tokenResult);
    // Call UserInfo Endpoint
    const userInfoResponse = await fetch(`${PUBLIC_COGNITO_URL}/oauth2/userInfo`, {
        headers: { "Authorization": `Bearer ${tokenResult.access_token}` }
    });
    const userInfoResult = await userInfoResponse.json();
    if(userInfoResult.email_verified !== 'true') {
        console.debug('email not verified');
        cookies.delete(PUBLIC_USERCOOKIE_NAME);
        throw redirect(302,'/authentication/notverified');
    }
    console.debug(userInfoResult);
    cookies.set(PUBLIC_USERCOOKIE_NAME, JSON.stringify(userInfoResult), { path: '/', maxAge: tokenResult.expires_in });
    throw redirect(302, "/");

}) satisfies RequestHandler;