import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';

interface User {
    username: string,
    name:string,
    avatarUrl: string,
    email: string
}


const useAuthenicationStore = defineStore('authentication', () => {
    const user = ref<null | User>();
    const getUser = computed(() => user.value)
    async function loginGoogle() {
        try {
            Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
        } catch (error) {
            console.error(error);
        }
    };
    async function setUser() {
        const curUser = await Auth.currentAuthenticatedUser();
        console.log('recieved: ', curUser);
        user.value = {
            avatarUrl: curUser.attributes.picture,
            username: curUser.username,
            name: curUser.attributes.preferred_username,
            email: curUser.attributes.email
        };
    }
    function signOut() {
        user.value = null;
        Auth.signOut();
    }

    return { user, getUser, loginGoogle, setUser }
});

export { useAuthenicationStore }