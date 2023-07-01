import { error } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { PUBLIC_CALLBACKURL, PUBLIC_COGNITO_CLIENTID, PUBLIC_COGNITO_URL } from '$env/static/public';
import { PRIVATE_COGNITO_CLIENT_SECRET } from '$env/static/private';

export const GET = (async ({ url, fetch }) => {
    //SIGNIN URL FOR GOOGLE : https://chaosphoto.auth.eu-central-1.amazoncognito.com/oauth2/authorize?response_type=code&redirect_uri=http://localhost:5173/api/authentication/callback&
    //scope=openid+profile+aws.cognito.signin.user.admin&identity_provider=Google&client_id=1ctijejkgtn9vmb1t499ng5r87

    //See https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html for AWS Cognito flow
    const code = url.searchParams.get("code");
    if (!code) {
        throw error(400, "No code provided");
    }
    console.log("received code : " + code);
    const basicToken = btoa(`${PUBLIC_COGNITO_CLIENTID}:${PRIVATE_COGNITO_CLIENT_SECRET}`);
    console.log("basicToken : " + basicToken);

    const urlParams = {
        "grant_type": "authorization_code",
        "client_id": PUBLIC_COGNITO_CLIENTID,
        "redirect_uri": `${url.origin}${PUBLIC_CALLBACKURL}`,
        "code": code
    }
    const formBody = Object.entries(urlParams).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&')
    console.log("formBody : " + formBody);
    // Call Token Endpoint
    try {
        const tokenResponse = await fetch(`${PUBLIC_COGNITO_URL}/oauth2/token`, {
            headers: {
                //"Authorization": `Basic ${btoa(PUBLIC_COGNITO_CLIENTID)}`,
                "Content-Type": "application/x-www-form-urlencoded",

            },
            body: formBody,
            method: "POST"
        });
        if (tokenResponse.status != 200) {
            console.log(tokenResponse.status);
            console.log(tokenResponse.statusText);
            console.log(await tokenResponse.text());
            throw error(500, "Token request failed");
        }

        const tokenResult = await tokenResponse.json();
        console.log(tokenResult);
        // Call UserInfo Endpoint
        const userInfoResponse = await fetch(`${PUBLIC_COGNITO_URL}/oauth2/userInfo`, {
            headers: { "Authorization": `Bearer ${tokenResult.access_token}` }
        });
        const userInfoResult = await userInfoResponse.json();
        console.log(userInfoResult);
        return new Response(JSON.stringify(userInfoResult));
    } catch (err) {
        console.log(err);
        throw error(500, JSON.stringify(err));
    }
}) satisfies RequestHandler;