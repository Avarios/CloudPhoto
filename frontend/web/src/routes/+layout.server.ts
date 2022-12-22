import type { LayoutServerLoad } from './$types';
import { COGNITO_CLIENTID, COGNITO_OAUTH2_URL } from '$lib/server/configuration'

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		debug: locals.debug,
		CognitoClientId:COGNITO_CLIENTID,
		CognitoUrl:COGNITO_OAUTH2_URL
	};
};