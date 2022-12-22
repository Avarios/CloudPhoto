<script lang="ts">
    import type { PageData } from "./$types";
    import { user } from "$lib/store";
    import { redirect } from "@sveltejs/kit";

    export let data: PageData;
    if (data.userInfo) {
        user.set({
            avatarUrl: data.userInfo.picture,
            mail: data.userInfo.email,
            username: data.userInfo.preferred_username,
        });
        throw redirect(302,"/")
    }
</script>

<h1>
    {JSON.stringify(data.userInfo)}
</h1>
