import { PUBLIC_COOKIENAME,PUBLIC_LOCALAUTHENTICATION_CALLBACK_URL } from '$env/static/public';
import { SECRET_COGNITO_URL, SECRET_COGNITO_CLIENTID } from '$env/static/private'
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies,url }) => {

    cookies.delete(PUBLIC_COOKIENAME, { path: "/" });
    const logoutUri = `${SECRET_COGNITO_URL}/logout?client_id=${SECRET_COGNITO_CLIENTID}&redirect_uri=${url.protocol}//${url.hostname}:${url.port}${PUBLIC_LOCALAUTHENTICATION_CALLBACK_URL}&response_type=code`;
    console.log(logoutUri);
    const logoutRequest = await fetch(logoutUri)
    console.log(logoutRequest.status);
    throw redirect(302,logoutRequest.url);
}) satisfies PageServerLoad;