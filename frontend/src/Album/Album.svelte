<script>
	import Album from "./AlbumItem.svelte";
	import { onMount } from "svelte";
	import { each } from "svelte/internal";
	import { toast } from "@zerodevx/svelte-toast";

	let albums;

	// Omly Faking API Call
	onMount(async () => {
		fetch("https://jsonplaceholder.typicode.com/albums1")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error(`Server returned with ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				albums = data;
			})
			.catch((err) => {
				console.log(err);
				toast.push(err.message, {
					theme: {
						"--toastBackground": "#F56565",
						"--toastBarBackground": "#C53030",
					}
				});
			});
	});
</script>

<div id="albums" class="container-fluid album py-5 bg-light ">
	<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
		{#if albums}
			{#each albums as album}
				<Album title={album.title} views={albums.length} />
			{/each}
		{/if}
	</div>
</div>

<style>
	#albums {
		display: flex;
		margin-top: 2%;
		flex-wrap: wrap;
	}
</style>
