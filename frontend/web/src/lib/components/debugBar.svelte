<script lang="ts">
    import { user } from '$lib/store';
    import type { User } from '$lib/models';
    import { Button } from '$lib/components';

    let fakeUser:User = {
        avatarUrl : "https://avatars.dicebear.com/api/pixel-art/7324897982398.svg",
        mail: "user@user.de",
        username: "fake"
    };

    const login = () => {
        user.set(fakeUser);
    }

    const logout = () => {
        user.set(undefined);
    }

</script>

<section class="block fixed bottom-0 w-full flex">
    <Button buttonHeight="10" onClick={login}>
        Emulate Login
    </Button>
    <Button buttonHeight="10" onClick={logout}>
        Emulate Logout
    </Button>
</section>