<script lang="ts">
	import type { PageData } from './$types';
	import "../app.css";
	import { user } from '$lib';
	export let data: PageData;

	import AppBar from '$lib/components/appBar.svelte';
	user.set(data.user);
</script>

<nav>
	<AppBar></AppBar>
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
