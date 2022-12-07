import { onMount } from "svelte";
import { Authentication } from '$lib/services'

export async function load() {
    const auth = new Authentication();
    return auth;
};