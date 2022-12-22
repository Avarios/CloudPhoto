import { writable } from "svelte/store";
import type { User } from '$lib/models'
import { browser } from '$app/environment';

const init = () => {
    if(browser) {
        let userString = window.localStorage.getItem(userItemKey)
        if(userString) {
            let userObject = JSON.parse(userString);
            if(userObject) {
                user.set(userObject)
            }
        }
    }
}

const userItemKey = 'user';

export const user = writable<User | undefined>()

init();

user.subscribe(usr => {
    if (browser) {
        if (usr) {
            window.localStorage.setItem(userItemKey, JSON.stringify(usr))
        } else {
            window.localStorage.removeItem(userItemKey);
        }
    }
})

