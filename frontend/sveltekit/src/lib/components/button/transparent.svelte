<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
    function Click(): void {
        dispatch('click')
    }
</script>

<button class="bg-transparent button hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" on:click={() => Click()}>
        <slot/>
</button>