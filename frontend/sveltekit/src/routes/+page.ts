import type { PageLoad } from './$types';

export const load = (({ url }) => {
    return {
        localurl: url.origin
    };
}) satisfies PageLoad;