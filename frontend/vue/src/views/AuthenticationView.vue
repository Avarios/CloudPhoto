<script lang="ts" setup>
import { useAuthenicationStore } from '../stores/authenication'
const auth = useAuthenicationStore();

</script>

<template>
  <button @click="auth.loginGoogle()">Google !</button>
  <div v-if="auth.getUser">Hi {{ auth.user?.username  }} </div>
</template>
