import { redirect, type Handle } from '@sveltejs/kit';
import { SECRET_COGNITO_OAUTH2_URL } from '$env/static/private'

export const handle = (async ({ event, resolve }) => {
  const user = event.locals.user;
  const userCookie = event.cookies.get('cloudphoto_token');
  console.log({
    user:user,
    userCookie:userCookie
  });

  if(userCookie && !user) {
    const userInfo = await getUserInformation(userCookie);
    event.locals.user = {
      avatarUrl: userInfo.picture,
      mail: userInfo.email,
      username: userInfo.preferred_username
    }
  }
  
  return await resolve(event);
}) satisfies Handle;


const getUserInformation = async (accessToken: string) => {
  const userInfoUrl = `${SECRET_COGNITO_OAUTH2_URL}/userInfo`;
  const options = {
    method: 'GET',
    headers: {
      Accept: '*/*',
      Authorization: `Bearer ${accessToken}`
    }
  } satisfies RequestInit;

  const userInfoResult = await fetch(userInfoUrl, options);
  const userInfo = await userInfoResult.json();

  console.debug({
    accessToken,
    options,
    userInfoUrl,
    userInfoResultText: userInfoResult.statusText,
    userInfo
  });
  if (!userInfoResult.ok) {
    throw redirect(302, "/error")
  }
 return userInfo;
}
