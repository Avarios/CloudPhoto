<script lang="ts">
    export let buttonSize:string = "w-28";
    export let buttonHeight:string;
    export let onClick:Function;
</script>

<button
    on:click={onClick()}
    class={`${buttonSize} h-${buttonHeight} rounded-md border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out text-indigo-500 p-0 flex flex-row justify-center items-center gap-1`}
    type="submit"
>
    <slot></slot>
</button>
