import { PUBLIC_USERCOOKIE_NAME } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const cookieUser = event.cookies.get(PUBLIC_USERCOOKIE_NAME);
    console.log(JSON.stringify(event.locals));
    if (cookieUser) { 
        console.log('user cookie found');
        const parsedUser = JSON.parse(cookieUser);
        
        event.locals.user = {
            email: parsedUser.email,
            pictureUrl: parsedUser.picture,
            showName: parsedUser.preferred_username != null ? parsedUser.preferred_username : parsedUser.username,
            username: parsedUser.username
        }
    } else {
        console.log('user cookie not found');
        event.locals.user = null;
    }


    const response = await resolve(event);
    return response;
}) satisfies Handle;