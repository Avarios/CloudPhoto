import type { LayoutServerLoad } from './$types';
import { SECRET_COGNITO_CLIENTID,  SECRET_COGNITO_OAUTH2_URL } from '$env/static/private'

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		debug: locals.debug,
		CognitoClientId:SECRET_COGNITO_CLIENTID,
		CognitoUrl:SECRET_COGNITO_OAUTH2_URL,
		user:locals.user
	};
};