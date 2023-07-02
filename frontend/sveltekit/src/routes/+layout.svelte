<script lang="ts">
	import type { PageData } from './$types';
	import { user } from '$lib';
	export let data: PageData;

	user.set(data.user);
</script>

<nav>
	<ul>
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/posts">Posts</a>
		</li>
	</ul>
</nav>

<slot />
