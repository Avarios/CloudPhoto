import { user } from '$lib/store';

/** @type {import('./$types').PageLoad} */
export async function load({ url, fetch }) {
    const code = url.searchParams.get('code');
    console.log(code);
    const tokenUrl = `https://scarecrow2.auth.eu-west-1.amazoncognito.com/oauth2/token?code=${code}&grant_type=authorization_code&redirect_uri=http://localhost:5173/login/callback`;
    const userInfoUrl = `https://scarecrow2.auth.eu-west-1.amazoncognito.com/oauth2/userInfo`;
    console.log(tokenUrl)
    const tokenResult = await fetch(tokenUrl, {
			'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization':
				'Basic ',
				
			},
			'method': 'POST'
		});
    const tokenData = await tokenResult.json();
    const userInfoResult = await fetch(userInfoUrl, {
        'headers': {
            'Authorization':
            `Bearer ${tokenData.access_token}`,
            
        },
        'method': 'GET'
    });
    const userInfoData = await userInfoResult.json();

    user.set({ mail:userInfoData.email ,username: userInfoData.username })

    return {
			authResult: userInfoData,
			code: code
		};
  }