
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SECRET_COGNITO_CLIENTID, SECRET_COGNITO_CLIENTSECRET, SECRET_COGNITO_OAUTH2_URL } from '$env/static/private'
import { user } from '$lib/store'

export const load = (async ({ url, fetch }) => {
  const codeParam = url.searchParams.get("code");
  if (!codeParam) {
    throw redirect(302, "/error")
  }

  const tokens = await getTokens(codeParam, url,fetch);
  const userInfo = await getUserInformation(tokens.access_token, fetch);
  user.set({
    avatarUrl: userInfo.picture,
    mail: userInfo.email,
    username: userInfo.username
  })
  return {
    userInfo
  };
}) satisfies PageServerLoad;

const getUserInformation = async (accessToken: string, fetch:Function) => {
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

const getTokens = async (code: string, url: URL,fetch:Function) => {
  const encodedCredentials = Buffer.from(`${SECRET_COGNITO_CLIENTID}:${SECRET_COGNITO_CLIENTSECRET}`).toString('base64');
  const tokenUrl = `${SECRET_COGNITO_OAUTH2_URL}/token`
  const encodedParams = new URLSearchParams();
  encodedParams.set('grant_type', 'authorization_code');
  encodedParams.set('client_id', SECRET_COGNITO_CLIENTID);
  encodedParams.set('code', code);
  encodedParams.set('redirect_uri', `${url.protocol}//${url.hostname}:${url.port}/login/callback`);

  const options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encodedParams
  };

  const tokenResult = await fetch(tokenUrl, options);
  const tokenResultBody = await tokenResult.json();
  console.log({
    Credentials: encodedCredentials,
    tokenBody: encodedParams,
    tokenUrl,
    options,
    tokenResultText: tokenResult.statusText,
    tokenResultBody: tokenResultBody
  });
  if (!tokenResult.ok) {
    throw redirect(302, "/error")
  }
  return tokenResultBody;
}