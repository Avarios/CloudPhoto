<script lang="ts">
    import type { ButtonSize } from "./buttonEnum";


    export let buttonType: string = "btn-primary";
    export let buttonSize: ButtonSize;
    export let href: string;
</script>

<a {href} class={`btn ${buttonType} ${buttonSize}`}>
    <slot />
</a>
