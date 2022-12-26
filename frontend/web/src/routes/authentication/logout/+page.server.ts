import { PUBLIC_COOKIENAME } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {

    cookies.delete(PUBLIC_COOKIENAME, { path: "/" });
    throw redirect(302, '/');
}) satisfies PageServerLoad;