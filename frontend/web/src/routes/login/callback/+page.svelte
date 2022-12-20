<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    import { Authentication } from '$lib/services'
</script>

<h1>
    {JSON.stringify(data)}
</h1>
