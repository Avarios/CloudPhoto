import Home from './Home/Home.svelte';
import Albums from './Album/Album.svelte'

export default [
    {
        path:"/",
        component:Home
    },
    {
        path:"/home",
        component:Home
    },
    {
        path:"/albums",
        component:Albums
    },
]