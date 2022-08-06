<script>
    import Album from './AlbumItem.svelte'
 </script>

<style>
	#albums {
		display:flex;
		margin-top: 2%;
		flex-wrap: wrap;
	}
</style>

<div id="albums" class="container-fluid album py-5 bg-light ">
	<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
		<Album></Album>
	</div>
</div>