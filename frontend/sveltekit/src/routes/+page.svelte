<script lang="ts">
	//https://chaosphoto.auth.eu-central-1.amazoncognito.com/oauth2/authorize?response_type=code&redirect_uri=http://localhost:5173/api/authentication/callback&
	//scope=openid+profile+aws.cognito.signin.user.admin&identity_provider=Google&client_id=1ctijejkgtn9vmb1t499ng5r87
	import {
		PUBLIC_COGNITO_CLIENTID,
		PUBLIC_CALLBACKURL,
		PUBLIC_COGNITO_URL
	} from '$env/static/public';
	import type { PageData } from './$types';
	import { user } from '$lib';
	export let data: PageData;
	const googleUrl = `${PUBLIC_COGNITO_URL}/oauth2/authorize?response_type=code&redirect_uri=${data.localurl}${PUBLIC_CALLBACKURL}&scope=openid+profile+aws.cognito.signin.user.admin&identity_provider=Google&client_id=${PUBLIC_COGNITO_CLIENTID}`;
</script>

<h1>Home</h1>

{#if !$user}
	<a href={googleUrl}> Login with Google</a>
{/if}

<div>{$user?.showName}</div>
