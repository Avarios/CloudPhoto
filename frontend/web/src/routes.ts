import Home from './components/Home/Home.svelte';
import Albums from './components/Album/Album.svelte'
import Login from './components/Authentication/Login.svelte';
import Signup from './components/Authentication/Signup.svelte';
import VerifyUser from './components/Authentication/VerifyUser.svelte';

export interface Route {
    path: string,
    component: any
    requireAuth?:boolean
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
                path:'/albums',
                requireAuth:false
            },
            {
                component:Login,
                path:'/login',
                requireAuth:false
            },
            {
                component:Signup,
                path:'/signup',
                requireAuth:false
            },
            {
                component:VerifyUser,
                path:'/verify',
                requireAuth:false
            }
        ]
    }
}