<script lang="ts">
  import { AppBar, DebugBar } from "$lib/components";
  export let data;


</script>

<div>
  <AppBar />
  <main>
    <slot />

    {#if data.debug}
		<DebugBar />
	{/if}
  </main>
</div>
