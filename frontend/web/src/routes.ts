import Home from './Home/Home.svelte';
import Albums from './Album/Album.svelte'

export interface Route {
    path: string,
    component: any
}

export class Routes {
    get getRoutes(): Route[] {
        return [
            {
                component: Home,
                path:'/'
            },
            {
                component:Home,
                path:'/home'
            },
            {
                component:Albums,
                path:'/albums'
            }
        ]
    }
}