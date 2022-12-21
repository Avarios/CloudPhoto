<script lang="ts">
  import { AppBar, DebugBar } from "$lib/components";
  import type { PageData } from './$types'

  export let data: PageData;
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
