<script lang="ts">
    import type { PageData } from './$types';
    import SocialLogin from '$lib/components/button/socialLogin.svelte';
    import GoogleLogo from '$lib/assets/glogo.svg'

    export let data:PageData

</script>

<div class="flex flex-row justify-center mt-24">
    <SocialLogin Text={"Sign in with Google"} Image={GoogleLogo} on:click={() => window.open(data.googleUrl, '_blank')}/>
</div>


