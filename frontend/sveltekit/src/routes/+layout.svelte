<script lang="ts">
	import type { PageData } from './$types';
	import "../app.postcss";
	import { user } from '$lib';
	export let data: PageData;

	import AppBar from '$lib/components/appBar.svelte';
	user.set(data.user);
</script>

<div id="main">
	<AppBar></AppBar>	
	<slot></slot>
</div>


