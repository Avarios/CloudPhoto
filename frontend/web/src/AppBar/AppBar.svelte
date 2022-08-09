<script lang="ts">
    import { onMount } from "svelte";
    import { Authentication } from "../Authentication/authentication";
    import UserMenu from "./UserMenu.svelte";
    const auth = Authentication.Instance;

    $: isAuthenticated = false;
    $: username = "";

    onMount(async () => {
        isAuthenticated = auth.isAuthenticated;
        username = auth.isAuthenticated ? auth.userInformation.firstName : "";
    });
</script>

<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="/home">CloudPhoto</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/home"
                        >Home</a
                    >
                </li>
                {#if isAuthenticated}
                    <li class="nav-item">
                        <a class="nav-link" href="/albums">Albums</a>
                    </li>
                {/if}
            </ul>

            {#if isAuthenticated}
                <UserMenu userName={username} on:logout={auth.logout} />
            {/if}
            {#if !isAuthenticated}
                <div class="text-end">
                    <a href="/login" class="btn btn-outline-light me-2">Login</a
                    >
                    <a href="/signup" class="btn btn-warning">Signup</a>
                </div>
            {/if}
        </div>
    </div>
</nav>
