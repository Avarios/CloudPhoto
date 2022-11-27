import { writable } from "svelte/store";
import type { CloudPhotoUser } from '../../models'

export const user = writable<CloudPhotoUser>()