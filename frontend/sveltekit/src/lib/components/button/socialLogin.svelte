<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    export let Image:string;
    export let Text:string;

    const dispatch = createEventDispatcher()
    function Click(): void {
        dispatch('click')
    }
</script>

<button on:click={Click} type="button" class="hover:bg-blue-500 text-blue-700 font-medium hover:text-white focus:ring-4 border border-blue-500 hover:border-transparent focus:outline-none focus:ring-[#4285F4]/50 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
    <img class="w-4 h-4 mr-2" src={Image} alt={Image}/>
    {Text}
  </button>