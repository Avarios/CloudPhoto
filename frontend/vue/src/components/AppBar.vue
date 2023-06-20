<script setup lang="ts">
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue'
const auth = useAuthenticator();
</script>

<template>
  <div> Hi {{ auth.user }} </div>
</template>
