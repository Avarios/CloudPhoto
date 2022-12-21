import { writable } from "svelte/store";
import type { User } from '$lib/models'

export const user = writable<User | undefined>()