<script lang="ts">
export default {
  name: 'LayoutDefault',

  components: {}
}
</script>

<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/authentication">Authentication</router-link>
  </div>
  <router-view/>
</template>
