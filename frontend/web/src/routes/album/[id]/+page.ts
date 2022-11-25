import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function load({ params }) {
    return {
      content: `Album id: ${params.id}`
    };
  throw error(404, 'Not found');
}