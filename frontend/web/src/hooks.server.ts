import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  console.log("handle called")
  event.locals.debug = false;
  if (event.url.searchParams.has('debug')) {
    console.debug('Found Debug Param');
    event.locals.debug = true;
  }
  
  const response = await resolve(event);
  return response;
}) satisfies Handle;