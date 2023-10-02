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

<style>
#main {
    margin: 0px;
    padding: 0px;
    min-height: 100vh;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
}
</style>


