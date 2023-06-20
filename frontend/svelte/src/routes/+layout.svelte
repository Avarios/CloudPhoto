<script lang="ts">
  import "../app.css";
  import { AppBar, LoadingIndicator } from "$lib/components";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <AppBar CognitoClientId={data.CognitoClientId} CognitoOauth2Url={data.CognitoUrl} User={data.user}/>
  
  <main>
    <LoadingIndicator>
      <slot />
    </LoadingIndicator>
  </main>
</div>
