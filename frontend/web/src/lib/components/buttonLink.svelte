<script lang="ts">
    export let buttonSize:string = "w-28";
    export let buttonHeight:string;
    export let href:string;
</script>

<a href={href} class={`${buttonSize} h-${buttonHeight} rounded-md border border-indigo-500 hover:bg-indigo-500 hover:text-white duration-100 ease-in-out text-indigo-500 p-0 flex flex-row justify-center items-center gap-1`}
>
    <slot></slot>
</a>